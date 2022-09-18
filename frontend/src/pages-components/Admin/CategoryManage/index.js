import SubList from "./SubList";
import MainList from "./MainList";

function CategoryManage() {
  return (
    <div className="row container mx-auto px-0">
      <div className="col-12 col-sm-10 col-md-8 col-lg-5 mx-auto mb-5 px-4">
        <MainList />
      </div>
      <div className="col-12 col-lg-7 mx-auto mb-5 px-4">
        <SubList />
      </div>
    </div>
  );
}

export default CategoryManage;
