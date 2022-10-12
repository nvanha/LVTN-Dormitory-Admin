import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '~/components/grid/Grid';
import SkeletonCustom from '~/components/skeleton/SkeletonCustom';
import { getDanhSachPhongRequest } from '~/redux/quanLyPhong/actions';
import ModalPreviewRoom from './components/ModalPreviewRoom';
import RoomItem from './components/RoomItem';

const QuanLyPhong = () => {
  const { isGetDanhSachPhongRequest, danhSachPhongState } = useSelector(
    (store) => store.quanLyPhong,
  );
  const dispatch = useDispatch();

  const [danhSachPhongKhuA, setDanhSachPhongKhuA] = useState([]);
  const [danhSachPhongKhuB, setDanhSachPhongKhuB] = useState([]);
  const [isShowModalPreview, setIsShowModalPreview] = useState(false);
  const [dataModalPreview, setDataModalPreview] = useState(null);

  useEffect(() => {
    dispatch(getDanhSachPhongRequest());
  }, []);

  useEffect(() => {
    if (danhSachPhongState) {
      setDanhSachPhongKhuA(danhSachPhongState?.Items?.khuNhaA);
      setDanhSachPhongKhuB(danhSachPhongState?.Items?.khuNhaB);
    }
  }, [danhSachPhongState]);

  const handleOpenModalPreview = (data) => {
    const { dataPhong, dataActive } = data;
    setDataModalPreview({
      dataPhong,
      dataActive,
    });
    setIsShowModalPreview(true);
  };

  const handleCloseModalPreview = () => {
    setIsShowModalPreview(false);
    setDataModalPreview(null);
  };

  return (
    <>
      <div className="quan-ly-phong-wrapper">
        <h3 className="cs-fz-28 cs-fw-500 cs-text-black cs-text-center mb-4 title">
          Khu Nhà A (Nam)
        </h3>
        <Grid col={10} mdCol={6} smCol={2} gap={20}>
          {isGetDanhSachPhongRequest
            ? [...new Array(25)]?.map((item, index) => (
              <SkeletonCustom
                key={index}
                length={1}
                width="100%"
                height="120px"
              />
            ))
            : danhSachPhongKhuA?.map((phongItem) => (
              <RoomItem
                key={phongItem.ID}
                data={phongItem}
                handleOpenModalPreview={handleOpenModalPreview}
              />
            ))}
        </Grid>
        <h3 className="cs-fz-28 cs-fw-500 cs-text-black cs-text-center mb-4 title">
          Khu Nhà B (Nữ)
        </h3>
        <Grid col={10} mdCol={8} smCol={6} gap={20}>
          {isGetDanhSachPhongRequest
            ? [...new Array(20)]?.map((item, index) => (
              <SkeletonCustom
                key={index}
                length={1}
                width="100%"
                height="120px"
              />
            ))
            : danhSachPhongKhuB?.map((phongItem) => (
              <RoomItem
                key={phongItem.ID}
                data={phongItem}
                handleOpenModalPreview={handleOpenModalPreview}
              />
            ))}
        </Grid>
      </div>

      {isShowModalPreview && (
        <ModalPreviewRoom
          show
          handleClose={handleCloseModalPreview}
          data={dataModalPreview}
        />
      )}
    </>
  );
};

export default QuanLyPhong;
