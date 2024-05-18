import { Modal } from "antd";
// import { Children } from "react";
const MyModal = ({is_modal_open , show_modal, handle_ok, handle_cancel , modal_detail , children , title}) => {
  // console.log(modal_detail);
  // console.log(children)
  return (
    <Modal
      title={title}
      open={is_modal_open}
      onOk={handle_ok}
      onCancel={handle_cancel}
      className="w-[100%]"
      width={"60%"}
    >
         {children && {  ...children}}  
      {/* <p>Passing Marks: {modal_detail?.passing_marks}</p>
      <p>Total Marks: {modal_detail.total_marks}</p>
      <p>Duration: {modal_detail.duration}mints</p> */}
    </Modal>
  );
};
export default MyModal;
