import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  exp: number;
}

const useAuthorization = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          setIsLoading(false);
          router.push("/login");
          return;
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push("/login");
      }
    };

    validateToken();
  }, [router]);

  return { isAuthenticated, isLoading };
};

export default useAuthorization;