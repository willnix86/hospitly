const seniorityWeights: {[index: string]: number} = {
    PGY1: 1.0,  // Highest priority for more shifts
    PGY2: 0.9,
    PGY3: 0.8,
    PGY4: 0.6,
    PGY5: 0.5,
    PGY6: 0.4   // Lowest priority for fewer shifts
};

export default seniorityWeights;