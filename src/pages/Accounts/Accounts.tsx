import { useState } from "react";
import { useStore } from "@/store";
import { formatCurrency, getAccountTypeLabel } from "@/utils/helpers";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import {
  IconAccounts,
  IconMoney,
  IconTrash,
  AccountTypeIcon,
} from "@/components/Icons";
import "./Accounts.css";

export default function Accounts() {
  const { accounts, addAccount, deleteAccount, user } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "checking" as const,
    initialBalance: 0,
    color: "#00BFFF",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addAccount({
      ...formData,
      userId: user.id,
      currentBalance: formData.initialBalance,
    });

    setFormData({
      name: "",
      type: "checking",
      initialBalance: 0,
      color: "#00BFFF",
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
      deleteAccount(id);
    }
  };

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + acc.currentBalance,
    0
  );

  return (
    <div className="accounts">
      <div className="accounts-header">
        <div>
          <h1 className="accounts-title">Mes Comptes</h1>
          <p className="accounts-subtitle">
            Solde total : <strong>{formatCurrency(totalBalance)}</strong>
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <span className="button-plus">+</span> Nouveau compte
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Card>
          <div className="accounts-empty">
            <span className="accounts-empty-icon">
              <IconAccounts size={48} />
            </span>
            <h2>Aucun compte</h2>
            <p>
              Créez votre premier compte pour commencer à suivre vos finances.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              Créer un compte
            </Button>
          </div>
        </Card>
      ) : (
        <div className="accounts-grid">
          {accounts.map((account) => (
            <Card key={account.id}>
              <div className="account-card">
                <div className="account-card-header">
                  <div
                    className="account-card-icon"
                    style={{
                      background: `${account.color}20`,
                      color: account.color,
                    }}
                  >
                    <AccountTypeIcon type={account.type} size={24} />
                  </div>
                  <button
                    className="account-card-delete"
                    onClick={() => handleDelete(account.id)}
                    title="Supprimer"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
                <h3 className="account-card-name">{account.name}</h3>
                <p className="account-card-type">
                  {getAccountTypeLabel(account.type)}
                </p>
                <div className="account-card-balance">
                  <span className="account-card-balance-label">Solde</span>
                  <span className="account-card-balance-value">
                    {formatCurrency(account.currentBalance)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouveau compte"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>Créer</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="account-form">
          <Input
            label="Nom du compte"
            icon={<IconAccounts size={20} />}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Compte courant"
          />

          <Select
            label="Type de compte"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as any })
            }
            options={[
              { value: "checking", label: "Compte courant" },
              { value: "savings", label: "Épargne" },
              { value: "cash", label: "Espèces" },
              { value: "card", label: "Carte bancaire" },
            ]}
          />

          <Input
            label="Solde initial"
            icon={<IconMoney size={20} />}
            type="number"
            step="0.01"
            value={formData.initialBalance}
            onChange={(e) =>
              setFormData({
                ...formData,
                initialBalance: parseFloat(e.target.value) || 0,
              })
            }
            required
          />

          <div className="account-form-color">
            <label className="input-label">Couleur</label>
            <div className="account-form-colors">
              {[
                "#00BFFF",
                "#32CD32",
                "#FFC107",
                "#ff6b6b",
                "#4ecdc4",
                "#ffa94d",
              ].map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`account-form-color-option ${
                    formData.color === color ? "active" : ""
                  }`}
                  style={{ background: color }}
                  onClick={() => setFormData({ ...formData, color })}
                />
              ))}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
