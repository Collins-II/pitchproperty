"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  RoleOptions,
  IdentificationTypes,
  UserFormDefaultValues,
} from "@/constants";

import { UserFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import FileUploader from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { IUser } from "@/lib/database/models/user.model";
import { createUser } from "@/app/actions/user.actions";
import axios from "axios";

const RegisterForm = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const allowedRoles = ["buyer", "seller", "agent", "admin", "moderator"] as const;
  type Role = typeof allowedRoles[number];

  const isValidRole = (role: string): role is Role => {
  return allowedRoles.includes(role as Role);
  };

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    /*defaultValues: {
      ...UserFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role as "buyer" | "seller" | "agent" | "admin" | "moderator",
    },*/
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserFormValidation>> = async (values) => {
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    /*if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }*/

    try {
      const client = {
        userId: user.id,
         name: values.name,
         email: values.email,
         phone: values.phone,
         image: values.image,
         bgImage: values.bgImage,
         bio: values.bio,
         gender: values.gender,
         birthday: values.birthday,
       
         address: {
           country: values.address?.country,
           state: values.address?.state,
           state_district: values.address?.state_district,
           suburb: values.address?.suburb,
           street: values.address?.street,
           zipCode: values.address?.zipCode,
         },
       
         role: values.role,
         isBusinessAccount: values.isBusinessAccount,
         companyName: values.companyName,
         companyLicense: values.companyLicense,
         businessVerified: values.businessVerified,
       
         subscriptionPlan: values.subscriptionPlan,
         subscriptionExpiresAt: values.subscriptionExpiresAt,
       
         // Verification
         kycVerified: values.kycVerified,
         verificationStatus: values.verificationStatus,
         identityDocument: {
           type: values.identityDocument?.type,
           number: values.identityDocument?.number,
           fileUrl: values.identityDocument?.fileUrl,
           issuedCountry: values.identityDocument?.issuedCountry,
           expiryDate: values.identityDocument?.expiryDate,
         },
         selfieUrl: values.selfieUrl,
      };

      const updatedUser = await axios.post("/api/users/update", client);
      if (updatedUser.status === 200) {
        router.push("/");
      } else {
        console.error("Failed to update user:", updatedUser.data);
      }

     
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
       // onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthday"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="role"
              label="Role"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {RoleOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
  fieldType={FormFieldType.INPUT}
  control={form.control}
  name="address.country"
  label="Country"
  placeholder="Country"
/>
<CustomFormField
  fieldType={FormFieldType.INPUT}
  control={form.control}
  name="address.state"
  label="State"
  placeholder="State"
/>

          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="companyName"
              label="CompanyName"
              placeholder=" Estate or Dealers Ltd"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="companyLicense"
              label="Company License"
              placeholder="License number"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="verificationStatus"
            label="Verification Status"
            placeholder="Select verification status"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField
  fieldType={FormFieldType.SELECT}
  control={form.control}
  name="identityDocument.type"
  label="Document Type"
  placeholder="Select document type"
/>
<CustomFormField
  fieldType={FormFieldType.INPUT}
  control={form.control}
  name="identityDocument.number"
  label="Document Number"
  placeholder="Enter document number"
/>
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="bio"
              label="Bio information"
              placeholder="A brief bio about yourself"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="bio"
              label="Current"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS 
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div> */}
        </section>

       {/* <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section> 

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>*/}

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
