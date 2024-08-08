
function heapSort(mainArray) //Max Heap
{
    let lastParentIdx = Math.floor(mainArray.length / 2 - 1);
    let lastChildIdx = mainArray.length - 1;

    while(lastParentIdx >= 0) //sắp xếp để tạo max heap (sắp xếp đúng giá trị cha con theo cây) => phần từ lớn nhất trong cả mảng sẽ vào index 0
    {
        heapify(mainArray, mainArray.length ,lastParentIdx); //sắp xếp từ những parent cuối cùng lên
        lastParentIdx--;
    }

    while(lastChildIdx > 0) //đổi vị trí phần tử lớn nhất ở index 0 cho phần tử cuối cùng của mảng(last child) và xếp xuống cuối đồng thời loại nó ra khỏi đệ quy
    // sau đó tiếp tục heapify để lại có max heap cho đến khi mảng sắp xếp xong
    {   
        [mainArray[0], mainArray[lastChildIdx]] = [mainArray[lastChildIdx], mainArray[0]];
        heapify(mainArray,lastChildIdx, 0);
        lastChildIdx--;
    }
}

function heapify(mainArray, length ,parentIdx)
{
    let largestIdx = parentIdx;
    let leftChildIdx = parentIdx * 2 + 1;
    let rightChildIdx = leftChildIdx + 1;
    
    if (leftChildIdx < length)
    {
        if (mainArray[leftChildIdx] > mainArray[largestIdx])
        {
            largestIdx = leftChildIdx;
        }
    }
    
    if (rightChildIdx < length )
    {
        if (mainArray[rightChildIdx] > mainArray[largestIdx])
        {
            largestIdx = rightChildIdx;
        }
    }
    if (largestIdx !== parentIdx)
    {
        [mainArray[parentIdx], mainArray[largestIdx]] = [mainArray[largestIdx], mainArray[parentIdx]];
        heapify(mainArray, length ,largestIdx);
    }
}