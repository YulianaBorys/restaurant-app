import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

import Section from '../components/ui/Section.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import AppButton from '../components/ui/AppButton.jsx';
import AvailabilityBadge from '../components/dishes/AvailabilityBadge.jsx';
import OrderSummary from '../components/orders/OrderSummary.jsx';
import OrderForm from '../components/orders/OrderForm.jsx';

function createEmptyDraft() {
  return {
    comment: '',
    needsCutlery: false,
  };
}

export default function OrderPage({ item, onClearSelection }) {
  const [draft, setDraft] = useState(createEmptyDraft);

  const pageTitle = item
    ? `Оформлення замовлення: ${item.name}`
    : 'Оформлення замовлення';

  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle;
    return () => {
      document.title = previousTitle;
    };
  }, [pageTitle]);

  function handleCommentChange(newComment) {
    setDraft((prevDraft) => ({
      ...prevDraft,
      comment: newComment,
    }));
  }

  function handleNeedsCutleryChange(needsCutlery) {
    setDraft((prevDraft) => ({
      ...prevDraft,
      needsCutlery: needsCutlery,
    }));
  }

  function handleReset() {
    setDraft(createEmptyDraft());
  }

  if (!item) {
    return (
      <Section id="order-page" title="Підготовка замовлення">
        <EmptyState title="Страва не обрана">
          <p>
            <Link to="/menu">Будь ласка, оберіть страву у меню для оформлення замовлення</Link>
          </p>
        </EmptyState>
      </Section>
    );
  }

  return (
    <Section id="order-page" title="Підготовка замовлення">
      <p>
        Обрано: «<strong>{item.name}</strong>»:{' '}
        <AvailabilityBadge available={item.availableForDelivery} />
      </p>

      <OrderForm
        dishName={item.name}
        draft={draft}
        onCommentChange={handleCommentChange}
        onNeedsCutleryChange={handleNeedsCutleryChange}
        onReset={handleReset}
      />

      <OrderSummary dishName={item.name} draft={draft} />

      <div style={{ marginTop: '20px' }}>
        <AppButton variant="secondary" onClick={onClearSelection}>
          Скасувати вибір і очистити форму
        </AppButton>
      </div>
    </Section>
  );
}