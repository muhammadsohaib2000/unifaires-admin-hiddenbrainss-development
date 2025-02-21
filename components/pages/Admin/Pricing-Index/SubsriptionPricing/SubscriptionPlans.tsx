"use client";
import {
  CloseOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Select,
  Switch,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface DataType {
  title: string;
  price: string;
  action: any;
  id: any;
}

const SubscriptionPlans = () => {
  const [form] = Form.useForm();
  const [createType, setCreateType] = useState(false);
  const [currency, setCurrency] = useState();
  const [dataSource, setDataSource] = useState();
  const [paymentId, setPaymentId] = useState();
  const [loading, setLoading] = useState(false);
  const [subFeatures, setSubFeatures] = useState<any>();

  const fetchPaymentTypes = async () => {
    try {
      const res = await axiosInstance.get("/subscription-plan");

      if (res.status) {
        // console.log(res);
        setDataSource(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchPaymentTypes();
  }, []);

  const handleCurrencyChange = (value: any) => {
    // console.log(value);
    setCurrency(value);
  };

  const handleCreate = async () => {
    await form.validateFields();

    const postData = form.getFieldsValue();
    const metaObjects =
      subFeatures &&
      subFeatures.map((feature: any) => {
        return {
          title: feature,
        };
      });
    postData.meta = metaObjects;
    try {
      setLoading(true);
      const res = await axiosInstance.post("/subscription-plan", {
        ...postData,
        // currency: currency,
      });
      if (res.status) {
        fetchPaymentTypes();
        setCreateType(false);
        form.resetFields();
        toast.success("Payment Type Created Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePaymentType = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/subscription-plan/${paymentId}`);

      if (res.status) {
        toast.success("Deleted Successfully");
        fetchPaymentTypes();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <IconText
          text="Delete"
          title="Delete course"
          icon={<DeleteOutlined />}
          className="text-accent-500"
        />
      ),
      key: "delete",
      onClick: handleDeletePaymentType,
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Duration(Months)",
      dataIndex: "description",
      key: "months",
      render: (text) => <Typography.Paragraph>{text}</Typography.Paragraph>,
    },
    {
      title: "Price($)",
      dataIndex: "price",
      key: "price",
      render: (text) => <Typography.Paragraph>{text}</Typography.Paragraph>,
      // render: (_, record) => (
      //   <Switch
      //     checked={record.access}
      //     loading={loading}
      //     // defaultChecked={record.access}
      //     // onChange={() => handlePermissionToggle(record)}
      //   />
      // ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="p-2 rounded-lg"
          >
            <Button
              type="text"
              shape="circle"
              icon={<EllipsisOutlined rotate={90} />}
              onClick={() => setPaymentId(record.id)}
            />
          </Dropdown>
        </div>
      ),
    },
  ];
  return (
    <div>
      {createType ? (
        <Form
          form={form}
          size="large"
          layout="vertical"
          className="flex gap-0 flex-col lg:w-[700px]"
        >
          <Form.Item
            name="title"
            required
            rules={[
              {
                required: true,
                message: "Enter Payment Type Title",
              },
            ]}
          >
            <Input placeholder="Payment Title... " className="rounded-sm" />
          </Form.Item>
          <Form.Item
            name="description"
            required
            rules={[
              {
                required: true,
                message: "Enter Payment Type Description",
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Payment Description... "
              className="rounded-sm"
            />
          </Form.Item>
          <div className="flex gap-2">
            <Form.Item
              name="price"
              required
              rules={[
                {
                  required: true,
                  message: "Enter Payment Price and Select a currency ",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="USD Price "
                className="rounded-sm"
              />
            </Form.Item>
            <Form.Item name="meta" className="w-full">
              <Select
                showSearch
                mode="tags"
                size="large"
                allowClear
                placeholder="Add Plan Features"
                optionFilterProp="children"
                filterOption={(
                  input: string,
                  option?: { label: string; value: string }
                ) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[]}
                onChange={(value) => setSubFeatures(value)}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="durationDays"
            required
            rules={[
              {
                required: true,
                message: "Enter Duration in month",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Plan Duration in Mohth(i.e 4)... "
              className="rounded-sm"
            />
          </Form.Item>

          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="flex ml-auto items-center rounded-sm"
              loading={loading}
              onClick={handleCreate}
            >
              Create
            </Button>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setCreateType(false)}
            />
          </div>
        </Form>
      ) : (
        <div>
          <Button
            className="flex ml-auto rounded-sm"
            type="primary"
            onClick={() => setCreateType(true)}
          >
            Create Payment Plan
          </Button>
        </div>
      )}
      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={dataSource}
          className="[&>div>div>ul.ant-table-pagination]:px-6"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SubscriptionPlans;
