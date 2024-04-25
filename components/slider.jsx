/*import './slider.css'

export default function Slider({
    height,
    itemWidth,
    items,
    className
}){

    const renderItem =( child, index)=> (
        <div
        id="tar"
        key = {index}
        className="h-full absolute text-wrap"
        style={{left:`${index * (itemWidth + 20 )}px`, width: `${itemWidth}px!important`}}
        >
            {child}
        </div>
    )

    return(
      <div className={`${className} w-full block`}> 

    <div
       className="overflow-x-auto w-full relative mySlider "
       style={{height: `${height}px`}}
       >
        {items.map ((item, index)=> {
            return renderItem (item, index);
        })}
        </div> 

      </div>

       
    )

}*/
import './slider.css';

export default function Slider({
    height,
    itemWidth,
    items,
    className
}) {

    const renderItem = (child, index) => (
        <div
            key={index}
            className="h-full absolute text-wrap"
            style={{ left: `${index * (itemWidth + 20)}px`, width: `${itemWidth}px` }}
        >
            {child}
        </div>
    );

    return (
        <div className={`${className} w-full h-300 block`}>
            <div
                className="overflow-x-auto w-full relative mySlider"
                style={{ height: `${height}px` }}
            >
                {items.map((item, index) => {
                    return renderItem(item, index);
                })}
            </div>
        </div>
    );
}
