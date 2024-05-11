/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';

import S from './styles.module.scss';

import Button from '@/components/Button';
import Loader from '@/components/Loader';

import { getUser } from '@/services';
import { User } from '@/types/api';

const Home = ({ params }: { params: { id: string } }) => {
  const [content, setContent] = React.useState<User | null>(null);

  const formatType = (type: string) => {
    switch (type) {
      case 'administrador':
        return 'Administrador(a)';
      case 'presidente':
        return 'Presidente(a)';
      case 'secretario':
        return 'Secretário(a)';
      case 'agricultor':
        return 'Agricultor(a)';
      case 'consumidor':
        return 'Consumidor(a)';
      default:
        return type;
    }
  };

  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem('@token');
    if (!token) {
      redirect('/');
    }
    getUser(token, params.id)
      .then((response: any) => setContent(response.user))
      .catch((error: any) => console.log(error));
  }, [params.id]);

  if (!content) {
    return <Loader />;
  }

  return (
    <main className={S.main}>
      <div className={S.container}>
        <div className={S.header}>
          <h1>{content.name}</h1>
          <Button
            onClick={() => router.push('/ocs/editar/' + params.id)}
            type="button"
            dataType="edit"
          >
            Editar <BiSolidEditAlt />
          </Button>
        </div>
        <div className={S.content}>
          {content?.roles?.map((role) =>
            typeof role === 'object' &&
            role !== null &&
            'id' in role &&
            'nome' in role ? (
              <h3 key={role.id} className={S.section}>
                {formatType(role.nome)}
              </h3>
            ) : null,
          )}
          <br />
          <h3>Nome</h3>
          <p>{content.name}</p>
          <h3>E-mail</h3>
          <p>{content.email}</p>
          <h3>CPF</h3>
          <p>{content.cpf}</p>
        </div>
      </div>
    </main>
  );
};

export default Home;
