import { useEffect, useState } from 'react';
import { Section } from '../common/Section';
import { User } from '../../api/user';
import styles from './styles.less';

export interface UserFieldFormkeys {
    label: string;
    fieldName: keyof User;
    value: string;
}

export interface UserFormProps {
    onChangeUser: (user: User, patch: Partial<User>) => void;
}

const useFormField = (fieldname: keyof User, value: string, onChange: (value: string) => void) => {
    switch (fieldname) {
        case 'title':
            const options = ['Ms', 'Mr', 'Miss', 'Mrs'];
            return (
                <select value={value} onChange={ev => onChange(ev.target.value)}>
                    {options.map(x => (
                        <option key={x}>{x}</option>
                    ))}
                </select>
            );
        case 'firstName':
        case 'lastName':
        case 'postCode':
            return (
                <input type="text" value={value} onChange={x => onChange(x.target.value)}></input>
            );
    }
};

export const UserFieldForm = ({
    user,
    label,
    fieldName,
    value,
    onChangeUser,
}: { user: User } & UserFieldFormkeys & UserFormProps) => {
    const [name, setName] = useState<string>('');
    const formField = useFormField(fieldName, name, setName);

    useEffect(() => {
        setName(value);
    }, [value]);

    const onSubmitClick = () => {
        onChangeUser(user, { [fieldName]: name });
    };

    return (
        <Section>
            <div className={styles.item}>
                <div className={styles.itemLabel}>{label}</div>
                {formField}
                <button disabled={!name} onClick={onSubmitClick} className={styles.submitBtn}>
                    Submit Query
                </button>
            </div>
        </Section>
    );
};
