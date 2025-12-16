import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port:465,
  secure:true,
  tls: {
    rejectUnauthorized: false // Désactive la vérification du certificat
  },
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS
  }
});

// mail inscription
export const mailInscription = (mailDestinataire, login) => {
  return {
    from: process.env.SMTP_USER,
    to: mailDestinataire,
    subject: 'Bienvenue sur notre plateforme !',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1976d2;">Bienvenue ${login} !</h2>
        <p>Félicitations 🎉 votre inscription a bien été enregistrée.</p>
        <p>Vous pouvez maintenant vous connecter à votre compte et accéder à toutes les fonctionnalités de notre plateforme.</p>
        <p style="margin-top: 30px;">À bientôt,<br><strong>L'équipe de LoreCrafters</strong></p>
      </div>
    `
  };
};

//mail réinitialisation mot de passe
export const mailForgotPassword = (mailDestinataire, nickname, tokenReset) => {
  return {
    from: process.env.SMTP_USER,
    to: mailDestinataire,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1976d2;">Bonjour ${nickname} !</h2>
        <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.</p>
        <p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :</p>
        <p><a href="${process.env.FRONTEND_URL}/passwordReset/${tokenReset}">Réinitialiser mon mot de passe</a></p>
        <p style="margin-top: 30px;">Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
        <p>À bientôt,<br><strong>L'équipe LoreCrafters</strong></p>
      </div>
    `
  };
};


