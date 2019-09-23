import React from 'react';

import { CentralLayout } from '../../layouts/Central';
import { PageCentral } from '../../layouts/PageCentral';
import { HeaderCentralBase } from '../../components/elements/header-cetral';
import { ChatRoom } from '../../components/chat/room';

export const ChatGeneral = () => (
  <CentralLayout>
    <PageCentral>
      <HeaderCentralBase value="Чат" step={1} total={3} />
      <ChatRoom />
    </PageCentral>
  </CentralLayout>
);
