"use client";

import Table from "@/components/Table";
import {
  createStudent,
  getStudents,
  updateStudent,
} from "@/services/actions/student";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { FormEvent, useRef, useState } from "react";
import DashboardNavbar from "../_components/DashboardNavbar";
import CardMain from "@/components/CardMain";
import { getSession } from "@/app/lib";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { z } from "zod";

function Index() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<any>({
    id: null,
    nis: "",
    nisn: "",
    name: "",
    grade: "",
    sex: "",
  });

  const getData = async () => {
    setLoading(true);
    let res = await getStudents();
    res?.map((item: any) => {
      item.sex_str = item.sex === 1 ? "Laki-Laki" : "Perempuan";
    });
    // console.table(res);
    setStudents(res);
    setLoading(false);
  };

  const checkAdmin = async () => {
    const storage = await getSession();
    const role = storage?.user?.profile?.role;
    if (role != 2) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  };

  useEffectAfterMount(() => {
    getData();
    checkAdmin();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(event);

    try {
      const formData = new FormData(event.currentTarget);

      const schema = z.object({
        nis: z.string().min(1, { message: "Kolom ini diperlukan" }),
        nisn: z.string().min(1, { message: "Kolom ini diperlukan" }),
        name: z.string().min(1, { message: "Kolom ini diperlukan" }),
        grade: z.string().min(1, { message: "Kolom ini diperlukan" }),
        sex: z.string().min(1, { message: "Kolom ini diperlukan" }),
      });

      const response = schema.safeParse({
        nis: formData.get("nis"),
        nisn: formData.get("nisn"),
        name: formData.get("name"),
        grade: formData.get("grade"),
        sex: formData.get("sex"),
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

      let res;
      if (isEdit) {
        res = await updateStudent(studentData?.id, response.data);
      } else {
        res = await createStudent(response.data);
      }
      if (res) {
        setModal(false);
        getData();
        clearInput();
      }
      setErrors([]);
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearInput = () => {
    ref.current?.reset();
    setStudentData({
      id: null,
      nis: "",
      nisn: "",
      name: "",
      grade: "",
      sex: "",
    });
    setErrors([]);
  };

  return (
    <>
      <DashboardNavbar active="Siswa" />
      <CardMain
        title="Daftar Siswa"
        onAdd={() => setModal(true)}
        isAdmin={isAdmin}
      >
        <Table
          items={students}
          loading={loading}
          heads={["NIS", "NISN", "Nama", "Jenis Kelamin", "Status"]}
          keys={["nis", "nisn", "name", "sex_str"]}
          noAction={!isAdmin}
          onEdit={(val: any) => {
            setIsEdit(true);
            console.log(val);
            setStudentData(val);
            //set the form with current
            setModal(true);
          }}
        />
      </CardMain>

      <form
        ref={ref}
        className="space-y-4 md:space-y-6"
        onSubmit={async (e) => {
          await onSubmit(e);
          ref.current?.reset();
        }}
      >
        <Modal
          closeModal={() => {
            setModal(false);
            clearInput();
          }}
          showModal={modal}
          label={isEdit ? "Edit Siswa" : "Tambah Siswa"}
          loadingSave={isLoading}
        >
          <Input
            label="NIS"
            name="nis"
            placeholder="123456"
            errors={errors}
            defaultValue={studentData?.nis}
          />
          <Input
            label="NISN"
            name="nisn"
            placeholder="123456"
            errors={errors}
            defaultValue={studentData?.nisn}
          />
          <Input
            label="Nama"
            name="name"
            placeholder="Budianto"
            errors={errors}
            defaultValue={studentData?.name}
          />
          <Input
            label="Grade"
            name="grade"
            placeholder="2024/2025"
            errors={errors}
            defaultValue={studentData?.grade}
          />
          <div>
            <label
              htmlFor="sex"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Jenis Kelamin
            </label>
            <select
              name="sex"
              defaultValue={studentData?.sex}
              className="p-2.5 block w-full mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-dark-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
            >
              <option value="" disabled>
                -- Pilih Kelamin --
              </option>
              <option value="1">Laki-laki</option>
              <option value="0">Perempuan</option>
            </select>
            <div className="mt-1 text-xs text-red-500">
              {errors.find((error: any) => error.for === "sex")?.message}
            </div>
          </div>
        </Modal>
      </form>
    </>
  );
}

export default Index;
