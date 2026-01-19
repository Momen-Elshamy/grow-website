// import { useQuery } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { GET_FRONT_PAGE_DATA } from "../queries/home";

// Home page hooks
export const useHomePageData = () => {
   const { data, loading, error } = useQuery(GET_FRONT_PAGE_DATA);

   return {
      homePageData: data?.nodeByUri,
      loading,
      error
   };
};
