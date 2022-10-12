import { Modal, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { ButtonCustom, InputText } from '~/components/form';

const ModalPreview = ({ show, handleClose, data }) => {
  const formik = useFormik({
    initialValues: {
      ID: data.ID,
      tenChucVu: data.tenChucVu,
      soLuong: parseInt(data.soLuong),
      tinhTrang: parseInt(data.tinhTrang),
    },
    validationSchema: Yup.object({
      tenChucVu: Yup.string().trim().required('Vui lòng tên chức vụ.'),
      soLuong: Yup.string().trim().required('Vui lòng nhập số lượng.'),
    }),
    onSubmit: (values) => {
      if (values.soLuong < parseInt(data.tinhTrang)) {
        formik.setErrors({ soLuong: 'Số lượng nhỏ nhất bằng tình trạng.' });
        return;
      }
      console.log('values: ', values);
    },
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="modal-preview-room quan-ly-chuc-vu"
    >
      <Modal.Header closeButton>
        <h1 className="cs-fz-32 cs-fw-600 cs-text-black mb-0">
          Thông tin chi tiết
        </h1>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <div className="flex-start-center">
            <div className="modal-preview-room--content__left">
              <InputText
                labelFor="ID"
                labelContent="Mã chức vụ:"
                id="ID"
                name="ID"
                disabled
                value={formik.values.ID}
              />
              <InputText
                labelFor="tenChucVu"
                labelContent="Tên chức vụ:"
                id="tenChucVu"
                name="tenChucVu"
                isRequired
                {...formik.getFieldProps('tenChucVu')}
                isValid={formik.touched.tenChucVu && !formik.errors.tenChucVu}
                isInvalid={formik.touched.tenChucVu && formik.errors.tenChucVu}
                isError={formik.touched.tenChucVu && formik.errors.tenChucVu}
                msgError={formik.errors.tenChucVu}
              />
              <InputText
                labelFor="soLuong"
                labelContent="Số lượng:"
                id="soLuong"
                name="soLuong"
                isRequired
                {...formik.getFieldProps('soLuong')}
                isValid={formik.touched.soLuong && !formik.errors.soLuong}
                isInvalid={formik.touched.soLuong && formik.errors.soLuong}
                isError={formik.touched.soLuong && formik.errors.soLuong}
                msgError={formik.errors.soLuong}
              />
              <InputText
                labelFor="tinhTrang"
                labelContent="Tình trạng:"
                id="tinhTrang"
                name="tinhTrang"
                disabled
                value={formik.values.tinhTrang}
              />
            </div>
            <div className="modal-preview-room--content__right">
              <p className="cs-fz-20 cs-fw-500 cs-color-black">
                Danh sách nhân viên:{' '}
                {data?.danhSachNhanVien?.length > 0
                  ? `${data.tinhTrang}/${data.soLuong}`
                  : 'Trống'}
              </p>
              {data?.danhSachNhanVien?.length > 0 && (
                <ul>
                  {data?.danhSachNhanVien?.map((item, index) => (
                    <li key={item.ID}>
                      {index + 1}: {item.hoTen} - {item.email}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <ButtonCustom customClassName="d-block w-100 mt-4" type="submit">
            Lưu
          </ButtonCustom>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ModalPreview;
