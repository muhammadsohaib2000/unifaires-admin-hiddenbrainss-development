"use client";
import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { BellFilled, DeleteOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCountries,
  fetchCountryStates,
  fetchStateCities,
} from "@/redux/features/CountrySlice";
import { fetchAllAddress, removeAddress } from "@/redux/features/AddressSlice";
import { toast } from "react-toastify";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";

interface AddressInt {
  id: number;
  zipcode: string;
  address: string;
  country: string;
  city: string;
  fullname: string;
  phoneNumber: string;
  state: string;
  default:boolean;
}

interface IProp {
  addressModal: boolean;
  selectedAddress: AddressInt | null;
  setAddressModal: any;
  setSelectedAddress: any;
  addressList: Array<AddressInt>;
}

const AddressModal = ({
  addressModal,
  setAddressModal,
  selectedAddress,
  setSelectedAddress,
  addressList,
}: IProp) => {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [defaultAddress, setDefaultAddress] = useState(false);
  const dispatch: any = useAppDispatch();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Ref for horizontal scrolling
  const onChange = (e: CheckboxChangeEvent) => {
    if (e) {
      setDefaultAddress(!defaultAddress);
    }
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const countries = useAppSelector((state: any) => state.country.countries);
  const countryListOption = countries.map((c: any) => ({
    label: c.name,
    value: c.name,
  }));

  const states = useAppSelector((state: any) => state.country.states);
  const statesOption = states.map((s: any) => ({
    label: s.name,
    value: s.name,
  }));

  const cities = useAppSelector((state: any) => state.country.cities);
  const citiesOption = cities.map((s: any) => ({
    label: s.name,
    value: s.name,
  }));

  const handleAddress = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();
    formData["default"] = defaultAddress;
    setLoading(true);
    await axios
      .post(
        `${config.API.API_URL}/address`,
        { ...formData },
        {
          headers: {
            "x-token": session?.user?.token,
          },
        }
      )
      .then((res) => {
        if (res.status) {
          setAddressModal(false);
          dispatch(fetchAllAddress(userId));
          message.success("Address added successfully");
        }
      })
      .catch(() => {
        message.error("Unable to Add Address");
      });
    setLoading(false);
  };

  const handleDeleteAddress = (id: any) => {
    try {
      const deleteAddress = dispatch(removeAddress(id));
      if (deleteAddress) {
        toast.success("Address Removed");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const closeModal = () => {
    setAddressModal(false);
  };

  const handleUseAddress = async (addressInfo: AddressInt | null) => {
    const id: any = addressInfo?.id;
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      const res = await axiosInstance.put(`/address/${id}`, {
        default: true,
      });
      if (res.status) {
        showSuccess("Address set as default");
        setSelectedAddress(addressInfo);
        dispatch(fetchAllAddress(userId));
        closeModal();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSelectedCountry = (countryCode: any) => {
    dispatch(fetchCountryStates(countryCode));
  };

  const handleSelectedState = (stateCode: any) => {
    dispatch(fetchStateCities(stateCode));
  };

  const handleScrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      left: -300, // Adjust scroll amount as needed
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: 300, // Adjust scroll amount as needed
      behavior: "smooth",
    });
  };
  console.log(addressList);
  return (
    <Fragment>
      <Modal
        open={addressModal}
        onCancel={closeModal}
        footer={false}
        width={800}
      >
        <div className="px-6">
          <div className="mb-8">
            <Typography.Title level={2}>Edit Address</Typography.Title>
            <Typography.Paragraph>
              This address appears on your monthly invoice and should be the legal address of your home or business.
            </Typography.Paragraph>
            <Typography.Paragraph>
              <BellFilled className="text-red-700 pr-2" />
              <span className="font-bold">Warning:</span> Updating your account address may update your Tax location.
            </Typography.Paragraph>
            <Divider />

            {/* Horizontal Scrollable Container */}
            <div className="relative">
              {addressList.length > 3 && (
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-50"
                  onClick={handleScrollLeft}
                  style={{
                    left: "-33px", // Adjusted for alignment
                    zIndex: 1000,
                  }}
                >
                  <LeftOutlined />
                </button>
              )}

              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto no-scrollbar px-4"
                style={{
                  scrollBehavior: "smooth",
                  position: "relative",
                }}
              >
                {addressList.map((addressInfo) => (
                  <Card
                    hoverable
                    key={addressInfo.id}
                    className={`flex-shrink-0 w-[250px] border ${
                      selectedAddress?.id === addressInfo.id ? "border-primary" : ""
                    }`}
                  >
                    <Typography.Paragraph className="m-0 text-gray-500">
                      {addressInfo.fullname}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-0 text-gray-500">
                      {addressInfo.address}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-0 text-gray-500">
                      {addressInfo.city} - {addressInfo.zipcode}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-0 text-gray-500">
                      {addressInfo.state}, {addressInfo.country}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-0 text-gray-500">
                      {addressInfo.phoneNumber}
                    </Typography.Paragraph>
                    <div className="flex justify-between items-center mt-4">
                      <Button
                        type="primary"
                        size="middle"
                        style={{
                          backgroundColor: addressInfo.default ? "green" : undefined,
                          borderColor: addressInfo.default ? "green" : undefined,
                          color: addressInfo.default ? "white" : undefined, // Font color set to white for default address
                        }}
                        onClick={() => handleUseAddress(addressInfo)}
                        disabled={addressInfo.default} // Button is disabled if default is true
                      >
                        Use this Address
                      </Button>
                      <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        className="text-red-600"
                        onClick={() => handleDeleteAddress(addressInfo.id)}
                        disabled={addressInfo.default} // Disable delete button if default is true
                      />
                    </div>
                  </Card>
                ))}
              </div>

              {addressList.length > 3 && (
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-50"
                  onClick={handleScrollRight}
                  style={{
                    right: "-33px", // Adjusted for alignment
                    zIndex: 1000,
                  }}
                >
                  <RightOutlined />
                </button>
              )}
            </div>

          </div>

          <Divider />
          <div>
            <Typography.Title level={3}> Add a New Address</Typography.Title>
            <Form layout="vertical" form={form} size="large">
              <Col>
                <Form.Item
                  name="country"
                  label="Country/Region"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please select a Country",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select Country"
                    optionFilterProp="children"
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={countryListOption}
                    onChange={handleSelectedCountry}
                  />
                </Form.Item>
              </Col>
              <Form.Item
                name="fullname"
                label="Full Name(First and Last Name)"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                ]}
              >
                <Input placeholder="BASF AG" className="p-4" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a phone Number",
                  },
                ]}
              >
                <Input type="number" placeholder="BASF AG" className="p-4" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter an Address",
                  },
                ]}
              >
                <Input placeholder="BASF AG" className="p-4" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col lg={8}>
                  <Form.Item
                    name="state"
                    label="State"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a State",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder="Select State"
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={statesOption}
                      onChange={handleSelectedState}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    name="city"
                    label="City"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a City",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select City"
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={citiesOption}
                    />
                  </Form.Item>
                </Col>

                <Col lg={8}>
                  <Form.Item
                    name="zipcode"
                    label="Zip Code"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select the Zip Code",
                      },
                    ]}
                  >
                    <Input placeholder="9394" />
                  </Form.Item>
                </Col>
              </Row>
              <Checkbox onChange={onChange}>
                Make this my default address
              </Checkbox>
            </Form>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <Button
            size="large"
            type="primary"
            className="ml-auto"
            onClick={handleAddress}
            loading={loading}
          >
            Add Address
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AddressModal;
