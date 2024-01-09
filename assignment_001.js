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
 * @param {Number} a4_width 
 * @param {Number} a4_height 
 * @param {Number} p_width 
 * @param {Number} p_height 
 */
function maxNoOutput(a4_width, a4_height, p_width, p_height) {

    // Calculate the number of post-it notes
    // Each side should cut into No. of pieces
    const count_type_1a = Math.floor(a4_width / p_width);
    const count_type_1b = Math.floor(a4_height / p_height);
    // Since paper have 2 sides and the formation should be 2 pairs of possible output  
    const count_type_2a = Math.floor(a4_width / p_height);
    const count_type_2b = Math.floor(a4_height / p_width);
    // Return the max possible result 
    // Although max is not stated in question but we always expect the best output
    return Math.max(count_type_1a * count_type_1b, count_type_2a * count_type_2b);
}

/**
 * @param {Number} a4_width 
 * @param {Number} a4_height 
 * @param {Number} a_width 
 * @param {Number} a_height 
 * @param {Number} b_width 
 * @param {Number} b_height 
 * @param {Number} total_type_a 
 * @param {Number} total_type_b 
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