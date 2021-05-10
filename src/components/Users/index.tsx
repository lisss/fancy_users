import { useCallback, useEffect, useState } from 'react';
import { getUsers, updateUser, User } from '../../api/user';
import { useFetchData } from '../../hooks/useFetchData';
import { UserDetails } from '../UserDetails';
import { Section } from '../common/Section';
import styles from './styles.less';

export const Users = () => {
    const {
        result: { loading, data, error },
    } = useFetchData(getUsers);

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    const onChangeUser = useCallback(
        (user: User, patch: Partial<User>) => {
            updateUser(user.id, { ...patch }).then(patched => {
                setUsers(
                    users.map(user => (user.id === patched.id ? { ...user, ...patched } : user)),
                );
                setSelectedUser({ ...user, ...patch });
            });
        },
        [users],
    );

    const onSelectUser = (id: number) => {
        const user = users.find(x => x.id === id) || null;
        setSelectedUser(user);
    };

    if (error) {
        return <div>{error.message}</div>;
    }

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.pageWrap}>
            <div className={styles.mainContainer}>
                <div className={styles.usersContainer}>
                    <Section>
                        <h1>Users</h1>
                        <div>
                            <label>Choose a user:</label>
                            <select
                                value={selectedUser?.id || ''}
                                onChange={ev => onSelectUser(Number(ev.target.value))}
                            >
                                <option disabled style={{ display: 'none' }}></option>
                                {users.map(x => (
                                    <option value={x.id} key={x.id}>
                                        {x.firstName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Section>
                    {selectedUser && <UserDetails {...{ user: selectedUser, onChangeUser }} />}
                </div>
            </div>
        </div>
    );
};
