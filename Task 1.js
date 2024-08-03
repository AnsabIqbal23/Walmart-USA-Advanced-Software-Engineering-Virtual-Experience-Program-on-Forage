class PowerOfTwoMaxHeap {
  
  // Contructor is use to itialize the heap and calculate the number of children (2^k) based on the parameter k.

  constructor(k) {
    if (k < 0) throw new Error("k must be non-negative");
    this.k = Math.pow(2, k);
    this.heap = [];
  }

  // Insert add a new value to the heap and then moves it up to maintain it's property.

  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  popMax() {
    if (this.heap.length === 0) throw new Error("Heap is empty");

    const maxValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastValue;
      this.siftDown(0);
    }

    return maxValue;
  }

  siftUp(index) {
    let childIndex = index;
    const childValue = this.heap[childIndex];

    while (childIndex > 0) {
      const parentIndex = Math.floor((childIndex - 1) / this.k);
      const parentValue = this.heap[parentIndex];

      if (parentValue >= childValue) break;

      this.heap[childIndex] = parentValue;
      childIndex = parentIndex;
    }

    this.heap[childIndex] = childValue;
  }

  siftDown(index) {
    let parentIndex = index;
    const parentValue = this.heap[parentIndex];

    while (true) {
      let maxChildIndex = -1;
      let maxChildValue = Number.MIN_SAFE_INTEGER;

      for (let i = 1; i <= this.k; i++) {
        const childIndex = this.k * parentIndex + i;

        if (childIndex >= this.heap.length) break;

        const childValue = this.heap[childIndex];
        if (childValue > maxChildValue) {
          maxChildValue = childValue;
          maxChildIndex = childIndex;
        }
      }

      if (maxChildIndex === -1 || maxChildValue <= parentValue) break;

      this.heap[parentIndex] = maxChildValue;
      parentIndex = maxChildIndex;
    }

    this.heap[parentIndex] = parentValue;
  }
}

// Tests the heap implementation with some values.

const heap = new PowerOfTwoMaxHeap(1);
heap.insert(10);
heap.insert(20);
heap.insert(5);
heap.insert(30);

console.log(heap.popMax());
console.log(heap.popMax());
console.log(heap.popMax());
console.log(heap.popMax());