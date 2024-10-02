'use client'

export function LoginForm() {

	// const [login, setLogin] = useState('')	

	return (
		<form>
			<input  />
		</form>
	)
}
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Button, Input, Label, Form, FormItem, FormControl, FormMessage } from 'shadcn/ui';

// Define the validation schema using Zod
// const loginSchema = z.object({
//   login: z.string().min(1, 'Login is required'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// const LoginForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = (data) => {
//     console.log(data); // Handle successful form submission here
//   };

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormItem>
//         <Label htmlFor="login">Login</Label>
//         <FormControl>
//           <Input id="login" {...register('login')} placeholder="Enter your login" />
//         </FormControl>
//         {errors.login && <FormMessage>{errors.login.message}</FormMessage>}
//       </FormItem>

//       <FormItem>
//         <Label htmlFor="password">Password</Label>
//         <FormControl>
//           <Input
//             id="password"
//             type="password"
//             {...register('password')}
//             placeholder="Enter your password"
//           />
//         </FormControl>
//         {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
//       </FormItem>

//       <Button type="submit">Login</Button>
//     </Form>
//   );
// };

// export default LoginForm;