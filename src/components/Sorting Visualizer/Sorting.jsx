import React, {useState} from "react";
import "./Sorting.css";
// import { mergeSort } from "../Sorting Algorithms/MergeSort";
import { getMergeSortAnimation } from "../Sorting Algorithms/MergeSort";
import { getBubbleSortAnimation } from "../Sorting Algorithms/BubbleSort";
import { getQuickSortAnimation } from "../Sorting Algorithms/QuickSort";
// import { getHeapSortAnimation } from "../Sorting Algorithms/HeapSort";

// Thay đổi tốc độ sắp xếp
let ANIMATION_SPEED_MS = 0; //giá trị càng cao càng chậm
const SpeedChoices =
  [
    { text: 'Slow', value: '1' },
    { text: 'Medium', value: '2' },
    { text: 'Fast', value: '3'}
  ]
// Số lượng cột
let NUMBER_OF_ARRAY_BARS = 0; //max 450
// Màu của cột
const PRIMARY_COLOR = 'white';
// Màu highlight khi sắp xếp
const SECONDARY_COLOR = 'red';
const THIRD_COLOR = 'blue';

const SpeedOption = ({ options, selected, onChange }) => {
  return (
    <div className="SpeedOptions">
      {options.map((choice, index) => (
        <label key={index}>
          <input type="radio"
            name="animation-speed"
            value={choice.value}
            key={index}
            checked={selected === choice.value}
            onChange={onChange} />
          {choice.text}
        </label>
      ))}
    </div>
  );
};
// -- thay hard code bằng input

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
            selectedOption : '',
            barAmount: '',
        };
        
    }

    // ++ xử lý user input
    handleAnimationSpeed(e) {
      this.setState({ selectedOption: e.target.value});
      if ( e.target.value === '1'){
        ANIMATION_SPEED_MS = 100;
      }else if(e.target.value === '2'){
        ANIMATION_SPEED_MS = 10;
      }else if(e.target.value === '3'){
        ANIMATION_SPEED_MS = 1;
      }
      
    }
    handleBarAmount(e){
      this.setState({barAmount: e.target.value});
      NUMBER_OF_ARRAY_BARS = e.target.value;
    }
    // -- xử lý user input

    resetArray() {
        const array = [];
        this.setState({array}); //reset array khi lỗi
        if (NUMBER_OF_ARRAY_BARS == 0) {
          alert('Bar Amount must have value')
        } else if(NUMBER_OF_ARRAY_BARS < 2){
          alert('Number must be greater or equal 2')
        }else if(NUMBER_OF_ARRAY_BARS > 450){
          alert('Number must be smaller or equal 450')
        }else
        {
          for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 730)); //random array
        }
        this.setState({array});
        // console.log(array);}
      }
    }
    // stopAnimation()
    // {
    //   for ( let i = 0 ; i < this.state.timeoutId.length; i++)
    //   clearTimeout(this.state.timeoutId[i])
    //   console.log('Timeout cleared')
    // }
    testSortingAlgorithms()
    {
      console.log((this.state.array));
      // console.log(getHeapSortAnimation(this.state.array));
    }

    mergeSort() {
      ////debugger
      if (this.state.selectedOption == 0 || this.state.barAmount == 0) {
        alert('Both Bar Amount and Animation Speed must have value')
      } //xử lý khi không đủ input
      else {
        const animations = getMergeSortAnimation(this.state.array); //lấy mảng animations chứa thông tin vị trí highlight và vị trí + value thay đổi
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2; // index của những mảng thể hiện vị trí = true/ index của những mảng thể hiện vị trí và value đổi = false
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; // phân biệt mảng highlight và mảng đảo ngược lại màu
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS); //đợi đến thứ tự của nó mới highlight
          } else { // đổi value của cột
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS); //đợi đến thứ tự của nó mới đổi value cột
          }
        }
      }
    }

    bubbleSort()
    {
      ////debugger
      if (this.state.selectedOption == 0 || this.state.barAmount == 0) {
        alert('Both Bar Amount and Animation Speed must have value')
      } //xử lý khi không đủ input
      else 
      {
        const animations = getBubbleSortAnimation(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        let counter = 0; // biến counter để đếm số thao tác để xếp thứ tự animation
        let dataCount = 0;// biến dataCount để đếm số lần 2 phần tử được so sánh đồng thời làm index để lấy dữ liệu trong animation để thay đổi hiển thị
        for (let i=0; i < this.state.array.length; i++)
        {
          for (let j = 0; j < this.state.array.length - i-1; j++)
          {
            // //debugger
            const [barOneIdx, barTwoIdx] = [j,j+1];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = SECONDARY_COLOR;
              barTwoStyle.backgroundColor = SECONDARY_COLOR;
            }, (counter++) * ANIMATION_SPEED_MS) //bước 1 highlight
            setTimeout(() => {
              barOneStyle.backgroundColor = PRIMARY_COLOR;
              barTwoStyle.backgroundColor = PRIMARY_COLOR;
            }, (counter++) * ANIMATION_SPEED_MS) //bước 2 bỏ highlight
            // if (this.state.array[j] > this.state.array[j+1])
            // {
            setTimeout(() => {
              const [barOneHeight, barTwoHeight] = animations[dataCount++]; //vì đã map index theo counter nên chỉ cần lấy height
              const barOneStyle = arrayBars[j].style;
              const barTwoStyle = arrayBars[j+1].style; //data đã được map tương ứng trong animation
              barOneStyle.height = `${barOneHeight}px`; 
              barTwoStyle.height = `${barTwoHeight}px`;
            }, (counter++) * ANIMATION_SPEED_MS); //bước 3 thay đổi bar height tương ứng
            // }
          }
        }
      }
    }
    selectionSort() //animation đồng thời với lúc sort không cần làm data riêng
    {
      ////debugger
      if (this.state.selectedOption == 0 || this.state.barAmount == 0) {
        alert('Both Bar Amount and Animation Speed must have value')
      } //xử lý khi không đủ input
      else 
      {
        // const animations = getSelectionSortAnimation(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        let counter = 0; // biến counter để đếm số thao tác để xếp thứ tự animation
        for (let i=0; i < this.state.array.length -1; i++)
        {
          const anchorBarIdx = i;
          const anchorBarStyle = arrayBars[anchorBarIdx].style; //biểu thị giá trị swap
          let iMin = i;
          for (let j = i+1; j < this.state.array.length; j++)
          {
            // //debugger
            
            const [barOneIdx, barTwoIdx] = [iMin,j];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = SECONDARY_COLOR;
              anchorBarStyle.backgroundColor = THIRD_COLOR;
              barTwoStyle.backgroundColor = SECONDARY_COLOR;
            }, (counter++) * ANIMATION_SPEED_MS) 
            setTimeout(() => {
              barOneStyle.backgroundColor = PRIMARY_COLOR
              anchorBarStyle.backgroundColor = THIRD_COLOR;
              barTwoStyle.backgroundColor = PRIMARY_COLOR;
            }, (counter++) * ANIMATION_SPEED_MS) 
            if (this.state.array[j] < this.state.array[iMin])
            {
              iMin = j;
            }
          }
          if (iMin !== i)
          {
            let buffer = this.state.array[i];
            this.state.array[i] = this.state.array[iMin];
            this.state.array[iMin] = buffer;
            setTimeout(() => {
              const [barOneHeight, barTwoHeight] = [this.state.array[i], this.state.array[iMin]];
              const barOneStyle = arrayBars[i].style;
              const barTwoStyle = arrayBars[iMin].style;
              barOneStyle.height = `${barOneHeight}px`; 
              barTwoStyle.height = `${barTwoHeight}px`;
            }, (counter++) * ANIMATION_SPEED_MS); 
          }
          setTimeout(() => {
            anchorBarStyle.backgroundColor = PRIMARY_COLOR;
          }, (counter++) * ANIMATION_SPEED_MS);
        }
      }
    }
    insertionSort() //animation đồng thời với lúc sort không cần làm data riêng
    {
      ////debugger
      if (this.state.selectedOption == 0 || this.state.barAmount == 0) {
        alert('Both Bar Amount and Animation Speed must have value')
      } //xử lý khi không đủ input
      else 
      {
        // const animations = getSelectionSortAnimation(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        let counter = 0; // biến counter để đếm số thao tác để xếp thứ tự animation
        for(let i=1; i < this.state.array.length; i++)
          {
             
            let InsertValue = this.state.array[i]
            let j = i - 1;
            while (j >= 0 && this.state.array[j] > InsertValue)
            {
              const movedBar = arrayBars[j+1].style;
              const movedHeight = this.state.array[j];
              const [barOneIdx, anchorBarIdx] = [j,i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const anchorBar = arrayBars[anchorBarIdx].style;
              setTimeout(() => {
                // //debugger 
                anchorBar.backgroundColor = SECONDARY_COLOR;
                barOneStyle.backgroundColor = SECONDARY_COLOR;                
              }, (counter++) * ANIMATION_SPEED_MS) 
              setTimeout(() => {
                barOneStyle.backgroundColor = PRIMARY_COLOR;                
              }, (counter++) * ANIMATION_SPEED_MS) 
              setTimeout(() => {
                movedBar.height = `${movedHeight}px`;
              }, (counter++) * ANIMATION_SPEED_MS); 
              this.state.array[j+1] = this.state.array[j]
              j--
            }
            setTimeout(() => {
              const anchorBar = arrayBars[i].style;
              const insertedHeight = InsertValue;
              const insertedBar = arrayBars[j+1].style;
              insertedBar.height = `${insertedHeight}px`; 
              anchorBar.backgroundColor = PRIMARY_COLOR;
            }, (counter++) * ANIMATION_SPEED_MS); 
            this.state.array[j+1] = InsertValue;            
          }
      }
    }
    quickSort() {
      ////debugger
      if (this.state.selectedOption == 0 || this.state.barAmount == 0) {
        alert('Both Bar Amount and Animation Speed must have value')
      } //xử lý khi không đủ input
      else {
        const animations = getQuickSortAnimation(this.state.array); //lấy mảng animations chứa thông tin vị trí highlight và vị trí + value thay đổi
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = (i % 4 == 0) || (i % 4 == 1); // index của những mảng thể hiện vị trí = true/ index của những mảng thể hiện vị trí và value đổi = false
          if (isColorChange) {
            //debugger
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; // phân biệt mảng highlight và mảng đảo ngược lại màu
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS); //đợi đến thứ tự của nó mới highlight
          } else { // đổi value của cột
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS); //đợi đến thứ tự của nó mới đổi value cột
          }
        }
      }
    }
    // ++ Heap Sort
    heapSort() //Max Heap
    {
      ////debugger
      if (this.state.selectedOption == 0 || this.state.barAmount == 0) {
        alert('Both Bar Amount and Animation Speed must have value')
      } else //xử lý khi không đủ input
      {
        //xử lý animation ++
        const arrayBars = document.getElementsByClassName('array-bar');
        let counter = {value: 0}; // biến counter để đếm số thao tác để xếp thứ tự animation
        //xử lý animation --

        let lastParentIdx = Math.floor(this.state.array.length / 2 - 1);
        let lastChildIdx = this.state.array.length - 1;

        while(lastParentIdx >= 0) //sắp xếp để tạo max heap (sắp xếp đúng giá trị cha con theo cây) => phần từ lớn nhất trong cả mảng sẽ vào index 0
        {
          //debugger
          this.heapify(this.state.array.length ,lastParentIdx ,counter); //sắp xếp từ những parent cuối cùng lên
          lastParentIdx--;
        }

        while(lastChildIdx > 0) //đổi vị trí phần tử lớn nhất ở index 0 cho phần tử cuối cùng của mảng(last child) và xếp xuống cuối đồng thời loại nó ra khỏi đệ quy
        // sau đó tiếp tục heapify để lại có max heap cho đến khi mảng sắp xếp xong
        { 
          [this.state.array[0], this.state.array[lastChildIdx]] = [this.state.array[lastChildIdx], this.state.array[0]];

          //animate
          const [barOneHeight, barTwoHeight] = [this.state.array[0], this.state.array[lastChildIdx]];
          const barOneStyle = arrayBars[0].style;
          const barTwoStyle = arrayBars[lastChildIdx].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;    
            barTwoStyle.backgroundColor = SECONDARY_COLOR;              
          }, (counter.value++) * ANIMATION_SPEED_MS) 
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR; 
            barTwoStyle.backgroundColor = PRIMARY_COLOR;                  
          }, (counter.value++) * ANIMATION_SPEED_MS) 
          setTimeout(() => {
            barOneStyle.height = `${barOneHeight}px`; 
            barTwoStyle.height = `${barTwoHeight}px`; 
          }, (counter.value++) * ANIMATION_SPEED_MS); 
          //animate

          this.heapify(lastChildIdx, 0, counter);
          lastChildIdx--;
        }
      }
    }
    heapify( length ,parentIdx, counter)
    {
      const arrayBars = document.getElementsByClassName('array-bar');
      let largestIdx = parentIdx;
      let leftChildIdx = parentIdx * 2 + 1;
      let rightChildIdx = leftChildIdx + 1;
      // //debugger
      if (leftChildIdx < length)
      {
        //animate
        const barOneStyle = arrayBars[leftChildIdx].style;
        const barTwoStyle = arrayBars[largestIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;    
          barTwoStyle.backgroundColor = SECONDARY_COLOR;              
        }, (counter.value++) * ANIMATION_SPEED_MS) 
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR; 
          barTwoStyle.backgroundColor = PRIMARY_COLOR;                  
        }, (counter.value++) * ANIMATION_SPEED_MS) 
        //animate

        if (this.state.array[leftChildIdx] > this.state.array[largestIdx])
        {
            largestIdx = leftChildIdx;
        }
      }
      
      if (rightChildIdx < length )
      {
        //animate
        const barOneStyle = arrayBars[rightChildIdx].style;
        const barTwoStyle = arrayBars[largestIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;    
          barTwoStyle.backgroundColor = SECONDARY_COLOR;              
        }, (counter.value++) * ANIMATION_SPEED_MS) 
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR; 
          barTwoStyle.backgroundColor = PRIMARY_COLOR;                  
        }, (counter.value++) * ANIMATION_SPEED_MS) 
        //animate

        if (this.state.array[rightChildIdx] > this.state.array[largestIdx])
        {
            largestIdx = rightChildIdx;
        }
      }

      if (largestIdx !== parentIdx)
      {
        [this.state.array[parentIdx], this.state.array[largestIdx]] = [this.state.array[largestIdx], this.state.array[parentIdx]];

        //animate
        const [barOneHeight, barTwoHeight] = [this.state.array[parentIdx], this.state.array[largestIdx]];
        const barOneStyle = arrayBars[parentIdx].style;
        const barTwoStyle = arrayBars[largestIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;    
          barTwoStyle.backgroundColor = SECONDARY_COLOR;              
        }, (counter.value++) * ANIMATION_SPEED_MS) 
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR; 
          barTwoStyle.backgroundColor = PRIMARY_COLOR;                  
        }, (counter.value++) * ANIMATION_SPEED_MS) 
        setTimeout(() => {
          barOneStyle.height = `${barOneHeight}px`; 
          barTwoStyle.height = `${barTwoHeight}px`; 
        }, (counter.value++) * ANIMATION_SPEED_MS); 
        //animate

        this.heapify( length ,largestIdx, counter);
      }
    }
    // ++ Heap Sort

    render() {
        const {array} = this.state;

        return (
            <div className="container">
              <div className="button-container">
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                {/* <button onClick={() => this.stopAnimation()}>Stop Animation</button> */}
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>
                  Test Sorting Algorithms 
                </button>
              </div>
              <div className="input-container">
                <p>Number of bars (2-450): </p>
                <input 
                  type="number"
                  min="2"
                  max="450"
                  value={this.state.barAmount}
                  onChange={(e)=>this.handleBarAmount(e)}
                />
                <p>Animation speed: </p>
                <SpeedOption
                  options={SpeedChoices}
                  onChange={(e) => this.handleAnimationSpeed(e)}
                  selected={this.state.selectedOption} />
              </div>
              <div className="array-container">
                {array.map((value, idx) => (
                  <div
                    className="array-bar"
                    key={idx}
                    style={{
                      backgroundColor: PRIMARY_COLOR,
                      height: `${value}px`,
                    }}></div>
                ))}
              </div>
            </div>
          );
    }
}


function randomIntFromInterval(min, max) {
// min and max included
return Math.floor(Math.random() * (max - min + 1) + min);
}