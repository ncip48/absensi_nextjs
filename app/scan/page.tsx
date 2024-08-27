"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Input from "@/components/Input";
import { presentByNISwithToken } from "@/services/actions/absent";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import toast from "react-hot-toast";

function Index() {
  //OLD SCAN
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any[]>([]);
  const devices = useDevices();
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

  const [thisTime, setThisTime] = useState<any>("00:00:00");

  useEffectAfterMount(() => {
    const interval = setInterval(() => {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      setThisTime(date.toISOString().slice(11, 19));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const schema = z.object({
        nis: z.string().min(1, { message: "Kolom ini diperlukan" }),
      });

      const response = schema.safeParse({
        nis: formData.get("nis"),
      });

      // refine errors
      if (!response.success) {
        let errArr: any[] = [];
        const { errors: err } = response.error;
        for (var i = 0; i < err.length; i++) {
          errArr.push({ for: err[i].path[0], message: err[i].message });
        }
        setErrors(errArr);
        throw err;
      }

      formData.set("nis", "");
      const res = await presentByNISwithToken(response.data.nis);

      setErrors([]);
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onScan = async (nis: string) => {
    setIsLoading(true);

    try {
      const res = await presentByNISwithToken(nis);

      setErrors([]);
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-dark-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xs:max-w-lg xl:p-0 dark:bg-dark-800 dark:border-dark-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Absen Masuk
            </h1>
            <form
              // ref={ref}
              className="space-y-4 md:space-y-6"
              // onSubmit={async (e) => {
              //   await onSubmit(e);
              //   ref.current?.reset();
              // }}
            >
              {/* <Input
                label=""
                name="nis"
                errors={errors}
                placeholder="123456"
                leftIcon={<QrCodeIcon className="w-5 h-5 text-inherit" />}
              /> */}
              <select
                onChange={(e) => setDeviceId(e.target.value)}
                className="p-2.5 block w-full mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-dark-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
              >
                <option value={undefined}>Select a device</option>
                {devices.map((device, index) => (
                  <option key={index} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
              </select>
              <Scanner
                onScan={(result) => onScan(result[0]?.rawValue)}
                allowMultiple
                scanDelay={2000}
                constraints={{
                  deviceId: deviceId,
                }}
              />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                {thisTime}
              </h1>
              {/* <Button loading={isLoading} title="Absen" formSubmit block /> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
