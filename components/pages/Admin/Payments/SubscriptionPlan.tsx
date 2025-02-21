"use client";
import { CheckOutlined } from "@ant-design/icons";
import Container from "@/components/shared/container";
import { Breadcrumb, Button, Card, Tabs, TabsProps, Typography } from "antd";
import { Fragment } from "react";

const SubscriptionPlan = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: (
        <div className="m-4 mr-10">
          <div className="relative border border-black p-8 lg:w-[400px] w-full">
            <Typography.Title level={3}>Support plan</Typography.Title>
            <div className="flex lg:flex-row gap-10">
              <div>
                <Typography.Paragraph className="mb-0">
                  Current
                </Typography.Paragraph>
                <Typography.Paragraph className="mb-0 font-semibold">
                  Starter
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Paragraph className="mb-0">
                  Plan Cost
                </Typography.Paragraph>
                <Typography.Paragraph className="font-semibold">
                  $0/month
                </Typography.Paragraph>
              </div>
            </div>
            <Typography.Link>
              Learn more about Pro access for Organisations
            </Typography.Link>
            <div className="mt-4">
              <Button type="primary" size="large" className="rounded-sm">
                Modify Plan
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Plans",
      children: (
        <div>
          <div>
            <Typography.Paragraph className="font-semibold">
              Choose the right support plan for your need{" "}
            </Typography.Paragraph>
            <div className="flex lg:flex-row md:flex-row flex-col  gap-10 ">
              <Card className=" bg-[#5F38DD] rounded-[20px] p-4 text-white  ">
                <div className=" flex flex-col justify-between">
                  <div>
                    <div>
                      <Typography.Title
                        level={2}
                        className="font-bold text-white "
                      >
                        1 Year
                      </Typography.Title>
                      <Typography.Title
                        level={3}
                        className="text-white mt-2 font-bold"
                      >
                        $0{" "}
                      </Typography.Title>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-6 mt-2 items-center">
                        <CheckOutlined className="text-green-300 -mt-[15px] text-lg" />
                        <Typography.Paragraph className="text-white font-semibold">
                          68% Off | Save $106.40
                        </Typography.Paragraph>
                      </div>
                      <div className="flex gap-6">
                        <CheckOutlined className="text-green-300 -mt-[15px] text-lg" />
                        <Typography.Paragraph className="text-white font-semibold">
                          Billed Annually
                        </Typography.Paragraph>
                      </div>
                      <div className="flex gap-6">
                        <CheckOutlined className="text-green-300 -mt-[15px] text-lg" />
                        <Typography.Paragraph className="text-white font-semibold">
                          Renews at $49
                        </Typography.Paragraph>
                      </div>
                    </div>
                  </div>
                  <div className=" text-center mt-2">
                    <Button
                      size="large"
                      className="bg-white text-black font-bold rounded-[40px] w-full"
                    >
                      Current Plan
                    </Button>
                  </div>
                </div>
              </Card>
              <Card className="bg-[#5F38DD] rounded-[20px] p-4 text-white  ">
                <div>
                  <Typography.Title level={2} className="font-bold text-white ">
                    1 Year
                  </Typography.Title>
                  <Typography.Title
                    level={3}
                    className="text-white mt-2 font-bold"
                  >
                    $49{" "}
                    <span className="text-sm text-black font-semibold line-through ">
                      was $99
                    </span>
                  </Typography.Title>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-6 mt-2 items-center">
                    <CheckOutlined className="text-green-300 -mt-[15px] text-lg" />
                    <Typography.Paragraph className="text-white font-semibold">
                      68% Off | Save $106.40
                    </Typography.Paragraph>
                  </div>
                  <div className="flex gap-6">
                    <CheckOutlined className="text-green-300 -mt-[15px] text-lg" />
                    <Typography.Paragraph className="text-white font-semibold">
                      Billed Annually
                    </Typography.Paragraph>
                  </div>
                  <div className="flex gap-6">
                    <CheckOutlined className="text-green-300 -mt-[15px] text-lg" />
                    <Typography.Paragraph className="text-white font-semibold">
                      Renews at $99
                    </Typography.Paragraph>
                  </div>
                  <div className="flex gap-6">
                    <CheckOutlined className="-mt-[15px] text-lg text-green-300" />
                    <Typography.Paragraph className="text-white font-semibold">
                      Cancel Anytime
                    </Typography.Paragraph>
                  </div>
                </div>
                <div className=" text-center mt-2">
                  <Button
                    size="large"
                    className="bg-white text-black font-bold rounded-[40px] w-full"
                  >
                    Subscribe
                  </Button>
                </div>
              </Card>
            </div>

            <div className="mt-4">
              <Typography.Paragraph className="m-0">
                Have questions about about support billing?
              </Typography.Paragraph>
              <Typography.Link className="font-semibold">
                Create Ticket
              </Typography.Link>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <Fragment>
      <Container>
        <div className="lg:m-8 md:m-6 m-4">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { title: "Payment", href: "/dashboard/payment" },
                { title: "Subscription" },
              ]}
            />
          </div>
          <Typography.Title level={2} className="font-bold">
            Subscriptions
          </Typography.Title>

          <Button
            type="primary"
            size="large"
            className="flex ml-auto rounded-sm"
          >
            Create a Ticket{" "}
          </Button>
          <div>
            <Tabs
              defaultActiveKey="1"
              className="relative"
              size="middle"
              items={items}
              onChange={onChange}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default SubscriptionPlan;
