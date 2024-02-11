import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Home.module.css';
import { useState } from 'react';

interface IFormState {
    name: string;
    email: string;
}
function Home() {
    const { register, handleSubmit, reset } = useForm<IFormState>();
    const [isloading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit: SubmitHandler<IFormState> = (data) => {
        setIsLoading(true);
        fetch('http://localhost:5000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data) return;

                setIsSuccess(true);
                reset();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {isSuccess ? (
                    <div className={styles.success}>Dati inviati!</div>
                ) : (
                    <>
                        <h1>GTA 6 - Leave Request</h1>
                        <input
                            type='name'
                            placeholder='Enter name:'
                            {...register('name')}
                        />
                        <input
                            type='email'
                            placeholder='Enter Email:'
                            {...register('email')}
                        />
                        <button disabled={isloading}>
                            {isloading ? 'loading' : 'Want GTA!'}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}

export default Home;
