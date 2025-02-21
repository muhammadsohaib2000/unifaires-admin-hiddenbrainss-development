/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Typography } from "antd";
import location from "@/public/images/map-pin.svg";
import Container from "@/components/shared/container";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getCookie, setCookie } from "cookies-next";
import { fetchCurrencyConvertionRate } from "@/redux/features/CurrencySlice";
import { fetchAllAddress } from "@/redux/features/AddressSlice";
import axios from "axios";
import * as countryTimeZone from "countries-and-timezones";

const TopNav = () => {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const cookies = getCookie("ipInfo");
  const info = getJSONParse(cookies);
  const userCountry = info?.data?.country;
  const { Paragraph } = Typography;
  const defaultAddress = useAppSelector(
    (state: any) => state.address.defaultAddress
  );

  /**
   * Get country from system timezone
   */
  function getCountryFromSystemTimeZone() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeObj = countryTimeZone.getCountryForTimezone(timeZone);
    const countryName = typeof timeObj?.name === "string" ? timeObj.name : "";

    return countryName;
  }

  /**
   * Convert geolocation to sync
   */
  function getCurrentPositionAsync() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  /**
   * Get josn parse data
   */
  function getJSONParse(input1: any = "") {
    try {
      return JSON.parse(input1);
    } catch (error) {
      return undefined;
    }
  }

  /**
   * Get location address from nominatim.openstreetmap
   */
  const getLocationAddress = async (inputObj: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${inputObj?.latitude}&lon=${inputObj?.longitude}`
      );
      return {
        country:
          typeof response?.data?.address?.country === "string"
            ? response.data.address.country
            : getCountryFromSystemTimeZone(),
        countryCode:
          typeof response?.data?.address?.country_code === "string"
            ? response.data.address.country_code
            : "",
        regionName:
          typeof response?.data?.address?.state === "string"
            ? response.data.address.state
            : "",
        city:
          typeof response?.data?.address?.state_district === "string"
            ? response.data.address.state_district
            : "",
        zip:
          typeof response?.data?.address?.postcode === "string"
            ? response.data.address.postcode
            : "",
      };
    } catch (error) {
      return {
        country: getCountryFromSystemTimeZone(),
        countryCode: "",
        regionName: "",
        city: "",
        zip: "",
      };
    }
  };

  /**
   * Get geolocation data
   */
  const getGeoLocationInfo = async () => {
    try {
      const position: any = await getCurrentPositionAsync();
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      return await getLocationAddress({ latitude, longitude });
    } catch (error) {
      return {
        country: getCountryFromSystemTimeZone(),
        countryCode: "",
        regionName: "",
        city: "",
        zip: "",
      };
    }
  };

  /**
   * Get current location object
   */
  async function getCurrentLocationObj() {
    const currLocation = localStorage.getItem("currentLocation");
    let locObj = getJSONParse(currLocation);
    if (typeof locObj?.country !== "string") {
      locObj = await getGeoLocationInfo();
      localStorage.setItem("currentLocation", JSON.stringify(locObj));
    }

    return locObj;
  }

  const currentLocation = useMemo(() => {
    let loc1 = "Loading...";
    if (
      status === "authenticated" &&
      typeof defaultAddress?.zipcode === "string" &&
      typeof defaultAddress?.city === "string"
    ) {
      loc1 = `${defaultAddress.zipcode}, ${defaultAddress.city}`;
    } else if (status !== "authenticated" && typeof userCountry === "string") {
      loc1 = userCountry;
    } else if (
      session?.user?.id &&
      status === "authenticated" &&
      typeof defaultAddress?.zipcode !== "string"
    ) {
      dispatch(fetchAllAddress(session?.user?.id));
    }

    return (
      <span className="text-[14px] font-bold">{"Deliver to " + loc1}</span>
    );
  }, [defaultAddress, userCountry, status]);

  useEffect(() => {
    const setIpInfo1 = async () => {
      const locAddr = await getCurrentLocationObj();
      let ipInfo = getJSONParse(getCookie("ipInfo"));
      ipInfo = { ...ipInfo, data: locAddr };
      setCookie("ipInfo", JSON.stringify(ipInfo));
    };

    if (typeof userCountry !== "string") {
      setIpInfo1();
    }
  }, [userCountry]);

  const initiateSomeValues = () => {
    setCookie("currency", "USD");
    setCookie("language", "en");
    dispatch(fetchCurrencyConvertionRate({ currency: "USD" }));
  };

  useEffect(() => {
    initiateSomeValues();
  }, []);

  return (
    <>
      <div className="bg-blue-50">
        <Container className="px-6 container-fluid">
          <div className="flex items-center justify-between w-full gap-2 py-2">
            <div className="flex items-center">
              <Image src={location} alt="icon" />
              <Paragraph className="pl-2 mb-0 text-white">
                {currentLocation}
              </Paragraph>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TopNav;
