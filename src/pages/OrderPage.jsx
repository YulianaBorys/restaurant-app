import { useState, useEffect } from 'react';

import Section from '../components/ui/Section.jsx';
import AppButton from '../components/ui/AppButton.jsx';
import AvailabilityBadge from '../components/dishes/AvailabilityBadge.jsx';
import OrderSummary from '../components/orders/OrderSummary.jsx';
import OrderForm from '../components/orders/OrderForm.jsx';

function createEmptyDraft(initialDraft = {}) {
  return {
    comment: initialDraft.comment ?? initialDraft.purpose ?? '',
    needsCutlery: initialDraft.needsCutlery ?? initialDraft.needsHelp ?? false,
  };
}

export default function OrderPage({
  dish,
  title,
  initialDraft,
  onCancel,
  cancelLabel = 'Скасувати вибір і очистити форму',
}) {
  const [draft, setDraft] = useState(() => createEmptyDraft(initialDraft));

  const pageTitle = title ?? `Оформлення замовлення: ${dish.name}`;

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

  return (
    <Section id="order-page" title={title ?? 'Підготовка замовлення'}>
      <p>
        Обрано: «<strong>{dish.name}</strong>»
      </p>
      <p>
        <AvailabilityBadge available={dish.available} />
      </p>

      <OrderForm
        dishName={dish.name}
        draft={draft}
        onCommentChange={handleCommentChange}
        onNeedsCutleryChange={handleNeedsCutleryChange}
        onReset={handleReset}
      />

      <OrderSummary
        dishName={dish.name}
        quantity={1}
        comment={draft.comment}
        needsCutlery={draft.needsCutlery}
      />

      <div style={{ marginTop: '20px' }}>
        <AppButton variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </AppButton>
      </div>
    </Section>
  );
}