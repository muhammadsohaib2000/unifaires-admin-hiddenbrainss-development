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
import PaymentStatCard from "./PaymentStatCard";
import TransactionList from "./TransactionList";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { UserInt } from "@/app/utils/interface";
import Image from "next/image";
import WalletImage from "@/public/images/wallet.png";
import SendMoney from "@/public/images/sendMoney.png";
import PayPal from "@/public/images/PayPal.png";
import AddCard from "./components/AddCard";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { fetchAllAddress } from "@/redux/features/AddressSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import AddressModal from "./components/AddressModal";
import axiosInstance from "@/app/utils/axios-config";
import PaymentMethods from "./components/PaymentMethods";
import AddressSettings from "./components/AddressSettings";

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

const Payments = () => {
  const { data: session } = useSession();
  const [customerCard, setCustomerCard] = useState<Array<ICard>>([]);

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

  useEffect(() => {
    fetchUserCards();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: <TransactionList />,
    },
    {
      key: "2",
      label: "Payment Methods",
      children: <PaymentMethods />,
    },
    {
      key: "3",
      label: "Address Settings",
      children: <AddressSettings />,
    },
    // {
    //   key: "4",
    //   label: "Funding",
    //   children: <FundingPricing />,
    // },
  ];

  return (
    <Fragment>
      <div className="font-Montserrat">
        <section className="content-header">
          <Container className="p-6 container-fluid">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between">
              <div>
                <Typography.Title level={2} className="mb-0">
                  Bills & Payments
                </Typography.Title>
                <Typography.Paragraph className="mb-0">
                  Note: Information on this page is updated daily
                </Typography.Paragraph>
              </div>
              <div className="flex flex-row mt-2 gap-4 items-center">
                <Typography.Link>How Billing Work</Typography.Link>
                <Button
                  type="primary"
                  size="large"
                  className="font-semibold rounded-md"
                >
                  Make Payments
                </Button>
              </div>
            </div>
          </Container>
        </section>
        <nav>
          <Container className="px-6 container-fluid">
            <Tabs defaultActiveKey="1" items={items} />
          </Container>
        </nav>
        {/* <section className="content-header">
        <Container className="p-6 container-fluid">
          <PaymentStatCard />
        </Container>
      </section> */}
      </div>
    </Fragment>
  );
};
export default Payments;
