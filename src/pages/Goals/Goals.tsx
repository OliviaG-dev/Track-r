import { useState } from "react";
import { useStore } from "@/store";
import { formatCurrency, formatDate } from "@/utils/helpers";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import {
  IconGoals,
  IconMoney,
  IconCheck,
  IconTrash,
  IconCelebrate,
  IconCalendar,
  IconNote,
} from "@/components/Icons";
import "./Goals.css";

export default function Goals() {
  const { goals, accounts, addGoal, updateGoal, deleteGoal, user } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    accountId: "",
    targetAmount: 0,
    currentAmount: 0,
    targetDate: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addGoal({
      ...formData,
      userId: user.id,
      targetDate: formData.targetDate
        ? new Date(formData.targetDate)
        : undefined,
    });

    setFormData({
      name: "",
      accountId: "",
      targetAmount: 0,
      currentAmount: 0,
      targetDate: "",
      description: "",
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet objectif ?")) {
      deleteGoal(id);
    }
  };

  const handleUpdateAmount = (goalId: string, newAmount: number) => {
    updateGoal(goalId, { currentAmount: newAmount });
  };

  return (
    <div className="goals">
      <div className="goals-header">
        <div>
          <h1 className="goals-title">Objectifs</h1>
          <p className="goals-subtitle">{goals.length} objectif(s) en cours</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Nouvel objectif</Button>
      </div>

      {goals.length === 0 ? (
        <Card>
          <div className="goals-empty">
            <span className="goals-empty-icon">
              <IconGoals size={48} />
            </span>
            <h2>Aucun objectif</h2>
            <p>
              Définissez des objectifs d'épargne pour atteindre vos projets.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              Créer un objectif
            </Button>
          </div>
        </Card>
      ) : (
        <div className="goals-grid">
          {goals.map((goal) => {
            const account = accounts.find((a) => a.id === goal.accountId);
            const percentage =
              goal.targetAmount > 0
                ? (goal.currentAmount / goal.targetAmount) * 100
                : 0;
            const isCompleted = percentage >= 100;
            const remaining = goal.targetAmount - goal.currentAmount;

            const daysRemaining = goal.targetDate
              ? Math.ceil(
                  (new Date(goal.targetDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              : null;

            return (
              <Card key={goal.id}>
                <div className="goal-card">
                  <div className="goal-card-header">
                    <div
                      className={`goal-card-icon ${
                        isCompleted ? "completed" : ""
                      }`}
                    >
                      {isCompleted ? (
                        <IconCheck size={28} />
                      ) : (
                        <IconGoals size={28} />
                      )}
                    </div>
                    <button
                      className="goal-card-delete"
                      onClick={() => handleDelete(goal.id)}
                      title="Supprimer"
                    >
                      <IconTrash size={18} />
                    </button>
                  </div>

                  <h3 className="goal-card-name">{goal.name}</h3>
                  {goal.description && (
                    <p className="goal-card-description">{goal.description}</p>
                  )}

                  <div className="goal-card-info">
                    <span className="goal-card-info-label">Compte</span>
                    <span className="goal-card-info-value">
                      {account?.name || "Inconnu"}
                    </span>
                  </div>

                  {goal.targetDate && (
                    <div className="goal-card-info">
                      <span className="goal-card-info-label">Date cible</span>
                      <span className="goal-card-info-value">
                        {formatDate(goal.targetDate)}
                        {daysRemaining !== null && daysRemaining > 0 && (
                          <span className="goal-card-days">
                            {" "}
                            ({daysRemaining}j restants)
                          </span>
                        )}
                      </span>
                    </div>
                  )}

                  <div className="goal-card-amounts">
                    <div className="goal-card-amount">
                      <span className="goal-card-amount-label">Actuel</span>
                      <span className="goal-card-amount-value">
                        {formatCurrency(goal.currentAmount)}
                      </span>
                    </div>
                    <div className="goal-card-amount">
                      <span className="goal-card-amount-label">Objectif</span>
                      <span className="goal-card-amount-value">
                        {formatCurrency(goal.targetAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="goal-card-progress">
                    <div className="goal-card-progress-bar">
                      <div
                        className={`goal-card-progress-fill ${
                          isCompleted ? "completed" : ""
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <span className="goal-card-progress-text">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>

                  {!isCompleted && (
                    <div className="goal-card-remaining">
                      Reste {formatCurrency(remaining)} à épargner
                    </div>
                  )}

                  {isCompleted && (
                    <div className="goal-card-completed">
                      <IconCelebrate size={20} /> Objectif atteint !
                    </div>
                  )}

                  <div className="goal-card-update">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Nouveau montant"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const value = parseFloat(
                            (e.target as HTMLInputElement).value
                          );
                          if (!isNaN(value)) {
                            handleUpdateAmount(goal.id, value);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                    />
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
        title="Nouvel objectif"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>Créer</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="goal-form">
          <Input
            label="Nom de l'objectif"
            icon={<IconGoals size={20} />}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Vacances, Voiture, Urgences..."
          />

          <Select
            label="Compte associé"
            value={formData.accountId}
            onChange={(e) =>
              setFormData({ ...formData, accountId: e.target.value })
            }
            options={[
              { value: "", label: "-- Sélectionner un compte --" },
              ...accounts.map((acc) => ({ value: acc.id, label: acc.name })),
            ]}
          />

          <Input
            label="Montant cible"
            icon={<IconMoney size={20} />}
            type="number"
            step="0.01"
            value={formData.targetAmount}
            onChange={(e) =>
              setFormData({
                ...formData,
                targetAmount: parseFloat(e.target.value) || 0,
              })
            }
            required
          />

          <Input
            label="Montant actuel"
            icon={<IconMoney size={20} />}
            type="number"
            step="0.01"
            value={formData.currentAmount}
            onChange={(e) =>
              setFormData({
                ...formData,
                currentAmount: parseFloat(e.target.value) || 0,
              })
            }
            required
          />

          <Input
            label="Date cible (optionnelle)"
            icon={<IconCalendar size={20} />}
            type="date"
            value={formData.targetDate}
            onChange={(e) =>
              setFormData({ ...formData, targetDate: e.target.value })
            }
          />

          <Input
            label="Description (optionnelle)"
            icon={<IconNote size={20} />}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Décrivez votre objectif..."
          />
        </form>
      </Modal>
    </div>
  );
}
