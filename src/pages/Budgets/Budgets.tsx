import { useState, useMemo } from "react";
import { useStore } from "@/store";
import { FinanceService } from "@/services/finance.service";
import { formatCurrency } from "@/utils/helpers";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import { IconBudgets, IconMoney, IconTrash } from "@/components/Icons";
import "./Budgets.css";

export default function Budgets() {
  const { budgets, categories, transactions, addBudget, deleteBudget, user } =
    useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "",
    amount: 0,
    period: "monthly" as const,
    alertAt75: true,
    alertAt100: true,
  });

  const budgetStatuses = useMemo(() => {
    return budgets
      .map((budget) => {
        const category = categories.find((c) => c.id === budget.categoryId);
        if (!category) return null;
        return FinanceService.getBudgetStatus(budget, transactions, category);
      })
      .filter(Boolean);
  }, [budgets, transactions, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addBudget({
      ...formData,
      userId: user.id,
      startDate: new Date(),
    });

    setFormData({
      categoryId: "",
      amount: 0,
      period: "monthly",
      alertAt75: true,
      alertAt100: true,
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce budget ?")) {
      deleteBudget(id);
    }
  };

  const expenseCategories = categories.filter((c) => c.type === "expense");

  return (
    <div className="budgets">
      <div className="budgets-header">
        <div>
          <h1 className="budgets-title">Budgets</h1>
          <p className="budgets-subtitle">
            {budgets.length} budget(s) défini(s)
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Nouveau budget</Button>
      </div>

      {budgetStatuses.length === 0 ? (
        <Card>
          <div className="budgets-empty">
            <span className="budgets-empty-icon">
              <IconBudgets size={48} />
            </span>
            <h2>Aucun budget</h2>
            <p>Définissez des budgets pour mieux contrôler vos dépenses.</p>
            <Button onClick={() => setIsModalOpen(true)}>
              Créer un budget
            </Button>
          </div>
        </Card>
      ) : (
        <div className="budgets-grid">
          {budgetStatuses.map((status) => {
            if (!status) return null;

            const isWarning =
              status.percentage >= 75 && status.percentage < 100;
            const isDanger = status.isOver;

            return (
              <Card key={status.budget.id}>
                <div className="budget-card">
                  <div className="budget-card-header">
                    <div
                      className="budget-card-icon"
                      style={{
                        background: `${status.category.color}20`,
                        color: status.category.color,
                      }}
                    >
                      {status.category.icon}
                    </div>
                    <button
                      className="budget-card-delete"
                      onClick={() => handleDelete(status.budget.id)}
                      title="Supprimer"
                    >
                      <IconTrash size={18} />
                    </button>
                  </div>

                  <h3 className="budget-card-name">{status.category.name}</h3>

                  <div className="budget-card-amounts">
                    <div className="budget-card-amount">
                      <span className="budget-card-amount-label">Dépensé</span>
                      <span
                        className={`budget-card-amount-value ${
                          isDanger ? "danger" : isWarning ? "warning" : ""
                        }`}
                      >
                        {formatCurrency(status.spent)}
                      </span>
                    </div>
                    <div className="budget-card-amount">
                      <span className="budget-card-amount-label">Budget</span>
                      <span className="budget-card-amount-value">
                        {formatCurrency(status.budget.amount)}
                      </span>
                    </div>
                  </div>

                  <div className="budget-card-progress">
                    <div className="budget-card-progress-bar">
                      <div
                        className={`budget-card-progress-fill ${
                          isDanger
                            ? "danger"
                            : isWarning
                            ? "warning"
                            : "success"
                        }`}
                        style={{
                          width: `${Math.min(status.percentage, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="budget-card-progress-text">
                      {status.percentage.toFixed(0)}%
                    </span>
                  </div>

                  <div className="budget-card-remaining">
                    {status.isOver ? (
                      <span className="budget-card-remaining-over">
                        Dépassé de {formatCurrency(Math.abs(status.remaining))}
                      </span>
                    ) : (
                      <span className="budget-card-remaining-ok">
                        Reste {formatCurrency(status.remaining)}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouveau budget"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>Créer</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="budget-form">
          <Select
            label="Catégorie"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            options={[
              { value: "", label: "-- Sélectionner une catégorie --" },
              ...expenseCategories.map((cat) => ({
                value: cat.id,
                label: `${cat.icon} ${cat.name}`,
              })),
            ]}
          />

          <Input
            label="Montant du budget"
            icon={<IconMoney size={20} />}
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: parseFloat(e.target.value) || 0,
              })
            }
            required
          />

          <Select
            label="Période"
            value={formData.period}
            onChange={(e) =>
              setFormData({ ...formData, period: e.target.value as any })
            }
            options={[
              { value: "weekly", label: "Hebdomadaire" },
              { value: "monthly", label: "Mensuel" },
              { value: "yearly", label: "Annuel" },
            ]}
          />

          <div className="budget-form-alerts">
            <label className="budget-form-alert">
              <input
                type="checkbox"
                checked={formData.alertAt75}
                onChange={(e) =>
                  setFormData({ ...formData, alertAt75: e.target.checked })
                }
              />
              <span>Alerte à 75%</span>
            </label>
            <label className="budget-form-alert">
              <input
                type="checkbox"
                checked={formData.alertAt100}
                onChange={(e) =>
                  setFormData({ ...formData, alertAt100: e.target.checked })
                }
              />
              <span>Alerte à 100%</span>
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
}
