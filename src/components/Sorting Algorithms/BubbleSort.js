// export function bubbleSort(array)
// {
//     for(let i=0; i < array.length; i++)
//     {
//         for(let j =0; j< array.length - i - 1; j++)
//         {
//             if (array[j] > array[j+1])
//             {
//                 let buffer = array[j];
//                 array[j] = array[j+1];
//                 array[j+1] = buffer;
//             }
//         }
//     }
//     return array;
// }
export function getBubbleSortAnimation(mainArray)
{
    const animations = [];
    doBubbleSort(mainArray, animations);
    return animations;
}
function doBubbleSort(mainArray, animations) 
{
    for(let i=0; i < mainArray.length; i++)
    {
        for(let j =0; j< mainArray.length - i - 1; j++)
        {
            if (mainArray[j] > mainArray[j+1]) //so sánh 2 phần tử 
            {
                let buffer = mainArray[j];
                mainArray[j] = mainArray[j+1];
                mainArray[j+1] = buffer; 
                animations.push([mainArray[j], mainArray[j+1]]); //ghi array 2 phần tử được đảo vào array animation
            }
            else
            {
                animations.push([mainArray[j], mainArray[j+1]]); //ghi array 2 phần tử không cần đảo vào array animation
            }
        }
    }
}