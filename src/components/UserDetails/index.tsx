import { UserFieldForm, UserFieldFormkeys, UserFormProps } from '../UserFieldForm';

import { Section } from '../common/Section';
import { User } from '../../api/user';
import styles from './styles.less';

export const UserDetails = ({
    user,
    onChangeUser,
}: {
    user: User;
} & UserFormProps) => {
    const { title, firstName, lastName, postCode } = user;
    const detailItems = [title, firstName, lastName, postCode];

    const userFieldForms: UserFieldFormkeys[] = [
        {
            label: 'First name',
            fieldName: 'firstName',
            value: firstName,
        },
        {
            label: 'Last name',
            fieldName: 'lastName',
            value: lastName,
        },
        {
            label: 'Post code',
            fieldName: 'postCode',
            value: postCode,
        },
        {
            label: 'Title',
            fieldName: 'title',
            value: title,
        },
    ];

    return (
        <>
            <Section>
                <h1>User values</h1>
                {detailItems.map(x => (
                    <div className={styles.infoItem} key={x}>
                        {x}
                    </div>
                ))}
            </Section>
            {userFieldForms.map(field => (
                <UserFieldForm {...{ user, onChangeUser }} {...field} />
            ))}
        </>
    );
};
