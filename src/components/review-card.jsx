import StarIcon from "../assets/star.png";
import ThreeDotIcon from "../assets/three-dot.png";
import ChecklistIcon from "../assets/checklist.png";

export default function ReviewCard() {
  return (
    <div id="review-card" className="flex flex-col gap-5 w-[500px] h-[250px] border rounded-lg py-7 px-8">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <img
              key={index}
              src={StarIcon}
              alt={`star-${index}`}
              className="w-5 h-5"
            />
          ))}
        </div>
        <img src={ThreeDotIcon} alt="three-dot" className="w-5 h-2"/>
      </div>
      <div className="flex flex-col gap-3">
        <div id="name" className="flex items-center gap-2">
          <h1 className="font-semibold text-lg">John Doe</h1>
          <img src={ChecklistIcon} alt="checklist" className="w-5 h-5" />
        </div>
        <p className="text-[16px] text-chinese-black opacity-60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          laudantium beatae fugit cum. Sint ratione nostrum est quibusdam
          voluptate odit!
        </p>
      </div>
      <span className="font-medium text-[16px] text-chinese-black opacity-60">Posted on August 14, 2023</span>
    </div>
  );
}
