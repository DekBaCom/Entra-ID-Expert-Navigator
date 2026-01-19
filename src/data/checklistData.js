export const checklistData = [
    {
        id: "id-1",
        category: "Identity Fundamentals",
        item: "Sync on-premises directories with Entra ID Connect",
        impact: "High",
        link: "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect",
        defaultStatus: "Not Implemented"
    },
    {
        id: "id-2",
        category: "Identity Fundamentals",
        item: "Configure Custom Domain Names",
        impact: "Medium",
        link: "https://learn.microsoft.com/en-us/entra/fundamentals/add-custom-domain",
        defaultStatus: "Not Implemented"
    },
    {
        id: "id-3",
        category: "Identity Fundamentals",
        item: "Enable Company Branding",
        impact: "Low",
        link: "https://learn.microsoft.com/en-us/entra/fundamentals/customize-branding",
        defaultStatus: "Not Implemented"
    },
    {
        id: "sec-1",
        category: "Security & Zero Trust",
        item: "Enable Multi-Factor Authentication (MFA) for all users",
        impact: "Critical",
        link: "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks",
        defaultStatus: "Not Implemented"
    },
    {
        id: "sec-2",
        category: "Security & Zero Trust",
        item: "Block Legacy Authentication",
        impact: "High",
        link: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/block-legacy-authentication",
        defaultStatus: "Not Implemented"
    },
    {
        id: "sec-3",
        category: "Security & Zero Trust",
        item: "Implement Conditional Access Policies",
        impact: "High",
        link: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview",
        defaultStatus: "Not Implemented"
    },
    {
        id: "sec-4",
        category: "Security & Zero Trust",
        item: "Enable Identity Protection (Risk-based policies)",
        impact: "High",
        link: "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection",
        defaultStatus: "Not Implemented"
    },
    {
        id: "gov-1",
        category: "Access Governance",
        item: "Configure Privileged Identity Management (PIM)",
        impact: "High",
        link: "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure",
        defaultStatus: "Not Implemented"
    },
    {
        id: "gov-2",
        category: "Access Governance",
        item: "Set up Access Reviews for Groups and Apps",
        impact: "Medium",
        link: "https://learn.microsoft.com/en-us/entra/id-governance/access-reviews/access-reviews-overview",
        defaultStatus: "Not Implemented"
    },
    {
        id: "ext-1",
        category: "External Identities",
        item: "Configure B2B External Collaboration Settings",
        impact: "Medium",
        link: "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure",
        defaultStatus: "Not Implemented"
    }
];

export const architectureScenarios = [
    {
        id: "arch-1",
        title: "Hybrid Identity with Password Hash Sync",
        description: "Synchronize on-premises users to Entra ID using Entra ID Connect. Password Hash Sync allows users to sign in to cloud services with the same password as on-premises.",
        imageUrl: "https://placehold.co/600x400?text=Hybrid+Identity+Diagram"
    },
    {
        id: "arch-2",
        title: "Zero Trust Architecture",
        description: "Never trust, always verify. Implement Conditional Access, MFA, and device compliance checks before granting access to resources.",
        imageUrl: "https://placehold.co/600x400?text=Zero+Trust+Diagram"
    },
    {
        id: "arch-3",
        title: "B2B Guest Access & Collaboration",
        description: "Securely collaborate with external partners by inviting them as guests to your tenant, controlled by Conditional Access and Access Reviews.",
        imageUrl: "https://placehold.co/600x400?text=B2B+Guest+Access"
    },
    {
        id: "arch-4",
        title: "Passwordless Authentication",
        description: "Move away from passwords using FIDO2 keys, Microsoft Authenticator app, or Windows Hello for Business for a more secure login experience.",
        imageUrl: "https://placehold.co/600x400?text=Passwordless+Auth"
    }
];
