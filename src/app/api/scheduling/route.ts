import { NextRequest, NextResponse } from 'next/server';

// Base URL for the AWS API Gateway
const API_GATEWAY_BASE_URL = process.env.API_GATEWAY_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

export async function POST(request: NextRequest) {
  const headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN || ''}` // Add if using bearer token
  }

  const requestData = await request.json();

  try {
    switch (requestData.action) {
      case "getUserSchedule":
        // Use fetch to get work schedule for a user from API Gateway
        const userResponse = await fetch(`${API_GATEWAY_BASE_URL}/scheduling/getUserSchedule`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ 
            ...requestData
          }),
        });
        
        const userData = await userResponse.json();

        if (!userResponse.ok) {
          return NextResponse.json(
            { success: false, error: userData },
            { status: userData.status }
          );
        }

        return NextResponse.json({
          success: true,
          ...userData
        });
        
      case "getCallSchedule":
        // Use fetch to get call schedule for a department from API Gateway
        const callResponse = await fetch(`${API_GATEWAY_BASE_URL}/scheduling/getCallSchedule`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            ...requestData
          }),
        });
        
        const data = await callResponse.json();
        
        if (!callResponse.ok) {
          return NextResponse.json(
            { success: false, error: data },
            { status: callResponse.status }
          );
        }

        return NextResponse.json({
          success: true,
          data: {
            month: requestData.date, // 'YYYY-MM' format
            callShifts: data.callShifts || [],
            vacationDays: data.vacationDays || [],
            adminDays: data.adminDays || []
          }
        });

      case "regenerateSchedule":
        const regenerateResponse = await fetch(`${API_GATEWAY_BASE_URL}/scheduling/regenerateSchedule`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            userId: requestData.userId,
            department: requestData.department,
            date: requestData.date,
            hospitalName: requestData.hospitalName,
            action: 'regenerateSchedule'
          }),
        });
        
        const regenerateData = await regenerateResponse.json();
        
        if (!regenerateResponse.ok) {
          return NextResponse.json(
            { success: false, error: regenerateData },
            { status: regenerateResponse.status }
          );
        }

        return NextResponse.json({
          success: true,
          data: regenerateData
        });
    }
    return NextResponse.json(
      { success: false, error: 'Missing userId or department' },
      { status: 400 }
    );
  } catch (error) {
    return handleError(error)
  }
}

// Helper function to handle errors
const handleError = (error: any) => {
  console.error('API Error:', error);
  return NextResponse.json(
    { 
      success: false, 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : String(error)
    },
    { status: 500 }
  );
};
// PUT handler - Edit existing schedules
// const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { userId, departmentId, scheduleData } = req.body;

//   try {
//     if (userId) {
//       // Use fetch to edit work schedule for a user
//       const response = await fetch(`${API_GATEWAY_BASE_URL}/work-schedule`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, scheduleData }),
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         return res.status(response.status).json(data);
//       }

//       return res.status(200).json(data);
//     } else if (departmentId) {
//       // Use fetch to edit call schedule for a department
//       const response = await fetch(`${API_GATEWAY_BASE_URL}/call-schedule`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ departmentId, scheduleData }),
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         return res.status(response.status).json(data);
//       }

//       return res.status(200).json(data);
//     } else {
//       return res.status(400).json({ message: 'Missing userId or departmentId' });
//     }
//   } catch (error) {
//     return handleError(res, error);
//   }
// };

// DELETE handler - Delete schedule by ID
// const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { scheduleId } = req.query;

//   try {
//     if (scheduleId) {
//       // Use fetch to delete a schedule by ID
//       const response = await fetch(`${API_GATEWAY_BASE_URL}/schedule/${scheduleId}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         return res.status(response.status).json(data);
//       }

//       return res.status(200).json(data);
//     } else {
//       return res.status(400).json({ message: 'Missing scheduleId' });
//     }
//   } catch (error) {
//     return handleError(res, error);
//   }
// };