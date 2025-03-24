// src/components/ChangePasswordModal.tsx
import React from "react";
import { Modal, Input, Button, message } from "antd";
import { useSelector } from "react-redux";

import * as Yup from "yup";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { changePassword } from "../../../../services/tarotReaderServices";
import { RootState } from "../../../../redux/store";

// ✅ Validation Schema
const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  visible,
  onClose,
}) => {
  const readerId = useSelector((state: RootState) => state.auth.userId);

  // 🟢 Handle Submit
  // 🟢 Handle Submit
  const handleSubmit = async (
    values: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    actions: any
  ) => {
    if (!readerId) {
      message.error("Cannot change password: Missing reader ID.");
      return;
    }

    try {
      await changePassword({
        readerId: readerId, // ✅ Đảm bảo không phải null
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      message.success("Password changed successfully!");
      onClose();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Failed to change password."
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Modal
      title="Change Password"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm className="space-y-4">
            {/* 🟡 Old Password */}
            <div>
              <label className="block text-sm font-medium">Old Password</label>
              <Field
                name="oldPassword"
                as={Input.Password}
                placeholder="Enter old password"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* 🟢 New Password */}
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <Field
                name="newPassword"
                as={Input.Password}
                placeholder="Enter new password"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* 🟠 Confirm Password */}
            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                as={Input.Password}
                placeholder="Confirm new password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* 🟢 Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Change Password
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangePasswordModal;
