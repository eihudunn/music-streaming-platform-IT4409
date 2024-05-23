"use client"

import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Input from "./Input";

interface SearchInputProps {

}

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({url: '/search', query,});
    router.push(url);
  })

  return (
    <Input placeholder="What do you want to play?" value={value} onChange={(e) => setValue(e.target.value)}/>
  )
}

export default SearchInput;
