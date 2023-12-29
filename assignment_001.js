// Updated: 29 Dec: Document parameters

// Declare dimensions
const a4_width = 210;
const a4_height = 297;

const a_width = 76;
const a_height = 76;

const b_width = 38;
const b_height = 51;

// Reusable function
/**
 * @param {number} a4_width 
 * @param {number} a4_height 
 * @param {number} p_width 
 * @param {number} p_height 
 */
function maxNoOutput(a4_width, a4_height, p_width, p_height) {
    // Calculate the number of post-it notes
    // Each side should cut into No. of pieces
    const count__type_1a = Math.floor(a4_width / p_width);
    const count__type_1b = Math.floor(a4_height / p_height);
    // Since paper have 2 sides and the formation should be 2 pairs of possible output  
    const count__type_2a = Math.floor(a4_width / p_height);
    const count__type_2b = Math.floor(a4_height / p_width);
    // Return the max possible result 
    // Although max is not stated in question but we always expect the best output
    return Math.max(count__type_1a * count__type_1b, count__type_2a * count__type_2b);
}

/**
 * @param {number} a4_width 
 * @param {number} a4_height 
 * @param {number} a_width 
 * @param {number} a_height 
 * @param {number} b_width 
 * @param {number} b_height 
 * @param {number} total_type_a 
 * @param {number} total_type_b 
 */
function calculatePostItNotes(a4_width, a4_height, a_width, a_height, b_width, b_height) {
    // Get number outputs
    const total_type_a = maxNoOutput(a4_width, a4_height, a_width, a_height);
    const total_type_b = maxNoOutput(a4_width, a4_height, b_width, b_height);

    return { total_type_a, total_type_b };
}

// Calculate output just by calling ready and reusable function
const { total_type_a, total_type_b } = calculatePostItNotes(a4_width, a4_height, a_width, a_height, b_width, b_height);

/** 
    Simple calculation, the time complexity and space complexity is fixed. therefore is O(1)
    */

// Output the results 
console.log(`Number of Type-A post-it notes: ${total_type_a}`);
console.log(`Number of Type-B post-it notes: ${total_type_b}`);