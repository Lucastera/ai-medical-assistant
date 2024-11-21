import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { md5Encrypt } from "@/utils";

export interface User {
  username: string;
  password: string;
  basicInfo: BasicInfo;
}

interface BasicInfo {
  age: number | "";
  gender: string;
  medicalHistory: string;
  familyHistory: string;
}
interface RegisterPageProps {
  onRegister: (userData: User) => void;
  onSwitchToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegister,
  onSwitchToLogin,
}) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    basicInfo: {
      age: "",
      gender: "",
      medicalHistory: "",
      familyHistory: "",
    },
  } as User);

  const handleRegister = () => {
    const sendUserData = {
      ...userData,
      password: md5Encrypt(userData?.password)
    }
    onRegister(sendUserData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in userData) {
      setUserData((prev) => ({ ...prev, [name]: value }));
    } else {
      setUserData((prev) => ({
        ...prev,
        basicInfo: { ...prev.basicInfo, [name]: value },
      }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <Input
            name="age"
            type="number"
            placeholder="Age"
            value={userData.basicInfo.age}
            onChange={handleInputChange}
          />
          <Select
            onValueChange={(value) =>
              setUserData((prev) => ({
                ...prev,
                basicInfo: { ...prev.basicInfo, gender: value },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            name="medicalHistory"
            placeholder="Medical History"
            value={userData.basicInfo.medicalHistory}
            onChange={handleInputChange}
          />
          <Textarea
            name="familyHistory"
            placeholder="Family History"
            value={userData.basicInfo.familyHistory}
            onChange={handleInputChange}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleRegister}>
            Register
          </Button>
          <Button variant="link" onClick={onSwitchToLogin}>
            Already have an account? Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
