import ListItem from "../ListItem";
import { list } from "../../store/index";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { Obj } from "../../types/index";
import "./index.css";

const List = () => {
  const listArray = useRecoilValue<Obj[]>(list);
  const variants = {
    hidden: { opacity: 0, x: "-300px", y: "-50%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="list-container"
    >
      <p>
        <img className="list_xiaoxin" alt="xiaoxin" src="xiaobai.gif" />
        <br />
        历史记录
      </p>
      <div className="listheader-container">
        <div className="listheader-index">序号</div>
        <div className="listheader-time">时间</div>
        <div className="listheader-winner">赢家</div>
        <div className="listheader-review">复盘</div>
      </div>
      <div className="list-scrollContainer">
        {listArray.length !== 0 ? (
          listArray.map((item, index) => {
            const { time, winner } = item;
            return (
              <ListItem
                key={time}
                index={index + 1}
                time={time}
                winner={winner}
              />
            );
          })
        ) : (
          <div className="no-history">暂无历史记录</div>
        )}
      </div>
    </motion.div>
  );
};

export default List;
