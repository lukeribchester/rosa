export class SegmentTree {
  private readonly size: number;
  private readonly tree: boolean[]; // Stores whether the entire segment is fully available
  private readonly lazy: (boolean | null)[]; // Lazy propagation array

  /**
   * Create a segment tree either with a specific size (initially all false)
   * or from a provided boolean array (representing availability).
   */
  constructor(input: number | boolean[]) {
    if (typeof input === 'number') {
      this.size = input;
      // The segment tree array (and lazy array) need about 4x the size in the worst case
      this.tree = new Array<boolean>(4 * this.size).fill(false);
      this.lazy = new Array<boolean | null>(4 * this.size).fill(null);
      // If you want them initially all true, fill with true in build or updates
    } else {
      this.size = input.length;
      this.tree = new Array<boolean>(4 * this.size).fill(false);
      this.lazy = new Array<boolean | null>(4 * this.size).fill(null);
      // Build the tree based on the provided array
      this.build(input, 1, 0, this.size - 1);
    }
  }

  /**
   * Update the segment tree for the range [updateStart, updateEnd]
   * to set them all to `value` (true or false).
   *
   * @param updateStart Start of the update range
   * @param updateEnd   End of the update range
   * @param value       true => fully available, false => unavailable
   */
  public updateRange(
    updateStart: number,
    updateEnd: number,
    value: boolean
  ): void {
    this.updateRangeHelper(1, 0, this.size - 1, updateStart, updateEnd, value);
  }

  /**
   * Query if the entire range [queryStart, queryEnd] is fully available (true)
   * or not (false).
   *
   * @param queryStart Start of query range
   * @param queryEnd   End of query range
   */
  public queryRange(queryStart: number, queryEnd: number): boolean {
    return this.queryRangeHelper(1, 0, this.size - 1, queryStart, queryEnd);
  }

  /**
   * Build the segment tree from an initial boolean array.
   *
   * @param arr   The availability array (true/false) of length this.size
   * @param index Current tree node index
   * @param start Start index of the segment (in arr)
   * @param end   End index of the segment (in arr)
   */
  private build(
    arr: boolean[],
    index: number,
    start: number,
    end: number
  ): void {
    if (start === end) {
      // Leaf node
      this.tree[index] = arr[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    // Build left child
    this.build(arr, 2 * index, start, mid);
    // Build right child
    this.build(arr, 2 * index + 1, mid + 1, end);
    // Merge the results
    this.tree[index] = this.tree[2 * index] && this.tree[2 * index + 1];
  }

  /**
   * Lazily propagate an update to the children of the given node.
   *
   * @param index Current node index in the segment tree
   * @param start Start index of the segment
   * @param end   End index of the segment
   */
  private propagate(index: number, start: number, end: number): void {
    const lazyVal = this.lazy[index];
    if (lazyVal === null) {
      return; // Nothing to propagate
    }

    // Update the current node based on lazyVal
    this.tree[index] = lazyVal;

    // If not a leaf node, set the lazy values for children
    if (start !== end) {
      this.lazy[2 * index] = lazyVal;
      this.lazy[2 * index + 1] = lazyVal;
    }

    // Clear the lazy flag at current node
    this.lazy[index] = null;
  }

  /**
   * Recursive helper to apply a range update with lazy propagation.
   */
  private updateRangeHelper(
    index: number,
    start: number,
    end: number,
    left: number,
    right: number,
    value: boolean
  ): void {
    // First, propagate any pending updates at this node
    this.propagate(index, start, end);

    // No overlap
    if (start > right || end < left) {
      return;
    }

    // Total overlap
    if (left <= start && end <= right) {
      // Set the lazy flag
      this.lazy[index] = value;
      // Propagate immediately so the current node is updated
      this.propagate(index, start, end);
      return;
    }

    // Partial overlap
    const mid = Math.floor((start + end) / 2);
    this.updateRangeHelper(index * 2, start, mid, left, right, value);
    this.updateRangeHelper(index * 2 + 1, mid + 1, end, left, right, value);
    // Merge
    this.tree[index] = this.tree[2 * index] && this.tree[2 * index + 1];
  }

  /**
   * Recursive helper to perform a range query.
   *
   * @return true if the entire range is fully available, false otherwise.
   */
  private queryRangeHelper(
    index: number,
    start: number,
    end: number,
    left: number,
    right: number
  ): boolean {
    // First, propagate any pending updates
    this.propagate(index, start, end);

    // No overlap
    if (start > right || end < left) {
      // Return true for no overlap in a boolean AND logic,
      // so that it doesn't affect the final result incorrectly.
      // But practically, we handle overlap before calling children,
      // so this might not matter. We'll return true as a "neutral" value.
      return true;
    }

    // Total overlap
    if (left <= start && end <= right) {
      return this.tree[index];
    }

    // Partial overlap
    const mid = Math.floor((start + end) / 2);
    const leftQuery = this.queryRangeHelper(index * 2, start, mid, left, right);
    const rightQuery = this.queryRangeHelper(
      index * 2 + 1,
      mid + 1,
      end,
      left,
      right
    );
    return leftQuery && rightQuery;
  }
}
