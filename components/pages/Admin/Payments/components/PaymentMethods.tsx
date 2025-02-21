"use client";
import { Fragment, useEffect, useState } from "react";
import Container from "@/components/shared/container";
import {
  Button,
  Card,
  Divider,
  Radio,
  RadioChangeEvent,
  Tabs,
  TabsProps,
  Typography,
} from "antd";

import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { UserInt } from "@/app/utils/interface";
import Image from "next/image";
import WalletImage from "@/public/images/wallet.png";
import SendMoney from "@/public/images/sendMoney.png";
import AddCard from "./AddCard";
import { DeleteOutlined } from "@ant-design/icons";
import { getCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

interface DataType extends UserInt {
  completed: string;
  invoiceId: string;
  date: string;
  paymentId: number;
  user: UserInt;
}

interface ICard {
  id: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
}

const PaymentMethods = () => {
  const { data: session } = useSession();
  const dispatch: any = useAppDispatch();
  const userId: any = session?.user.id;
  const [customerCard, setCustomerCard] = useState<Array<ICard>>([]);
  const [isModalCard, setIsModalCard] = useState(false);
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const fetchUserCards = async () => {
    await axios
      .get(`${config.API.API_URL}/payment/customer-card`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        // console.log(res.data.data.data);
        setCustomerCard(res.data.data.data);
      })
      .catch((error) => {
        console.log(error, "hkj");
      });
  };

  const handleDeleteCard = async (id: any) => {
    await axiosInstance
      .post("/payment/remove-card", {
        cardId: id,
      })
      .then((res) => {
        fetchUserCards();
        showSuccess("Card removed Successfully");
      })
      .catch((error) => {
        handleAxiosError(error);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserCards();
  }, []);

  useEffect(() => {
    dispatch(fetchAllTax());
  }, []);

  const taxes = useAppSelector((state: any) => state.tax.taxes);
  const getTaxForCountry = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = taxes.find((c) => c.country == countryName);
    return country ? country.tax : 0;
  };
  const countryTax = getTaxForCountry(userCountry);

  const handleSelectCard = (e: RadioChangeEvent) => {
    console.log("this is the value", e.target.value);
  };

  return (
    <Fragment>
      <div className="font-Montserrat lg:m-10 m-6">
        <Container className="mt-8">
          {/* Payment Method */}
          <div className="border-2 p-8 mb-10">
            <Typography.Title level={3} className="font-bold">
              Payment Methods
            </Typography.Title>
            <div className="flex lg:flex-row md:flex-col-reverse flex-col-reverse bg-purple-300 lg:p-6 p-4 rounded-md">
              <div className="lg:w-3/5 w-full">
                <Typography.Paragraph className="font-semibold text-white">
                  Discover Effortless Transactions: Your Gateway to Secure
                  Payment Solutions!
                </Typography.Paragraph>
                <Typography.Paragraph className="text-white">
                  Experience seamless transactions with our diverse payment
                  methods, tailored for your convenience. With our hassle-free
                  payment solutions, enjoy swift, reliable, and worry-free
                  transactions every time.
                </Typography.Paragraph>
              </div>
              <div className="lg:block md:hidden relative lg:w-2/5">
                <div className="lg:absolute md:relative sm:relative lg:-top-[6rem] md:top-0 sm:top-0 right-0">
                  <Image
                    src={WalletImage}
                    alt="wallet"
                    // width={1500}
                    // height={1400}
                  />
                </div>
              </div>
            </div>
            <div className="my-10">
              <Typography.Paragraph className="text-lg font-bold mb-0">
                Cards
              </Typography.Paragraph>
              <div className="p-4 border rounded-md">
                <div className="mt-4">
                  <Radio.Group onChange={handleSelectCard}>
                    {customerCard?.length > 0 &&
                      customerCard.map((card) => {
                        return (
                          <Radio value={card} key={card.id}>
                            <Card
                              className="flex flex-row justify-between items-center mb-2"
                              // onClick={() => setSelectedCard(card)}
                            >
                              <div>
                                <Typography.Paragraph className="font-semibold text-blue-700 mb-0">
                                  {card.brand}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                  **** **** **** {card.last4}
                                </Typography.Paragraph>
                              </div>
                              <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                className="flex ml-auto my-0 text-red-700"
                                onClick={() => handleDeleteCard(card.id)}
                              />
                            </Card>
                          </Radio>
                        );
                      })}
                  </Radio.Group>
                </div>
              </div>
            </div>
            <AddCard
              isModalCard={isModalCard}
              setIsModalCard={setIsModalCard}
            />
            <Button
              type="primary"
              size="large"
              className="w-full rounded-md"
              onClick={() => setIsModalCard(true)}
            >
              Add a Payment Method
            </Button>
          </div>
        </Container>
        <Container className="mt-8">
          {/* Send Money to Unifaires */}
          <div className="mb-10">
            <div className="flex lg:flex-row md:flex-col-reverse flex-col-reverse bg-purple-300 lg:p-6 p-4 rounded-md">
              <div className="lg:w-3/5 w-full">
                <Typography.Paragraph className="font-semibold text-white mt-2 lg:text-left md:text-left text-center text-[24px]">
                  Send Money to Unifaires Accounts
                </Typography.Paragraph>
                <Typography.Paragraph className="text-white lg:text-left md:text-left text-center">
                  Send Money to Unifaires Accounts and others
                </Typography.Paragraph>
                <div className="flex justify-center md:justify-start lg:justify-start">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-white text-purple-300 rounded-md font-bold "
                  >
                    Send Money
                  </Button>
                </div>
              </div>
              <div className="lg:block md:hidden relative lg:w-2/5">
                <div className="lg:absolute md:relative sm:flex lg:-top-[2.8rem] md:top-0 sm:top-0 right-0">
                  <Image
                    src={SendMoney}
                    alt="wallet"
                    // width={300}
                    // height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};
export default PaymentMethods;
