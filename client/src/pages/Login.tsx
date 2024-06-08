import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/slices/api";
import { setCurrentUser, setIsLoggedIn } from "@/redux/slices/appSlice";
import { handleError } from "@/utils/handleError";

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await login(values).unwrap();
      dispatch(setCurrentUser(response));
      dispatch(setIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="__login grid-gradient-background w-full h-[calc(100vh-60px)] flex flex-col justify-center items-center gap-3">
      <div className="__form_container backdrop-blur-md border-[1px] py-8 px-4 flex flex-col gap-5 max-w-xs w-full">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Username or email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
        </Form>
        <small>
          Don't have an account?{" "}
          <Link className="underline" to="/signup">
            Sign Up
          </Link>
        </small>
      </div>
    </div>
  );
};
export default Login;
