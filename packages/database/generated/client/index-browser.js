
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  phone: 'phone',
  username: 'username',
  passwordHash: 'passwordHash',
  fullName: 'fullName',
  avatar: 'avatar',
  role: 'role',
  tenantId: 'tenantId',
  isActive: 'isActive',
  emailVerified: 'emailVerified',
  status: 'status',
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  deletedBy: 'deletedBy'
};

exports.Prisma.TenantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  domain: 'domain',
  status: 'status',
  templateId: 'templateId',
  templateVersionId: 'templateVersionId',
  themeOverrides: 'themeOverrides',
  activatedAt: 'activatedAt',
  expiresAt: 'expiresAt',
  onboardingCompletedAt: 'onboardingCompletedAt',
  uploadUsedBytes: 'uploadUsedBytes',
  version: 'version',
  trialStartAt: 'trialStartAt',
  trialEndAt: 'trialEndAt',
  trialSaveLimit: 'trialSaveLimit',
  trialSaveCount: 'trialSaveCount',
  trialStatus: 'trialStatus',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TemplateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  shortDescription: 'shortDescription',
  thumbnail: 'thumbnail',
  screenshots: 'screenshots',
  features: 'features',
  priceBuy: 'priceBuy',
  priceRentMonthly: 'priceRentMonthly',
  priceRentYearly: 'priceRentYearly',
  priceBuySource: 'priceBuySource',
  isActive: 'isActive',
  sortOrder: 'sortOrder',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy'
};

exports.Prisma.TemplateConfigScalarFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  themeConfig: 'themeConfig',
  layoutConfig: 'layoutConfig',
  featureFlags: 'featureFlags',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  orderNumber: 'orderNumber',
  fullName: 'fullName',
  email: 'email',
  phone: 'phone',
  note: 'note',
  subdomain: 'subdomain',
  type: 'type',
  status: 'status',
  templateId: 'templateId',
  userId: 'userId',
  tenantId: 'tenantId',
  plan: 'plan',
  amount: 'amount',
  paidAt: 'paidAt',
  billImageUrl: 'billImageUrl',
  transactionCode: 'transactionCode',
  adminNotes: 'adminNotes',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  orderId: 'orderId',
  plan: 'plan',
  status: 'status',
  amount: 'amount',
  startDate: 'startDate',
  endDate: 'endDate',
  cancelledAt: 'cancelledAt',
  billingPeriod: 'billingPeriod',
  autoRenew: 'autoRenew',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  title: 'title',
  slug: 'slug',
  description: 'description',
  shortDescription: 'shortDescription',
  type: 'type',
  status: 'status',
  price: 'price',
  priceFrom: 'priceFrom',
  priceTo: 'priceTo',
  area: 'area',
  areaFrom: 'areaFrom',
  areaTo: 'areaTo',
  address: 'address',
  ward: 'ward',
  district: 'district',
  city: 'city',
  latitude: 'latitude',
  longitude: 'longitude',
  investor: 'investor',
  developer: 'developer',
  constructionYear: 'constructionYear',
  handoverDate: 'handoverDate',
  totalUnits: 'totalUnits',
  amenities: 'amenities',
  images: 'images',
  thumbnail: 'thumbnail',
  floorPlans: 'floorPlans',
  documents: 'documents',
  youtubeUrl: 'youtubeUrl',
  virtualTourUrl: 'virtualTourUrl',
  featured: 'featured',
  sortOrder: 'sortOrder',
  seoTitle: 'seoTitle',
  seoDescription: 'seoDescription',
  seoKeywords: 'seoKeywords',
  published: 'published',
  publishedAt: 'publishedAt',
  version: 'version',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  title: 'title',
  slug: 'slug',
  content: 'content',
  summary: 'summary',
  thumbnail: 'thumbnail',
  categoryId: 'categoryId',
  published: 'published',
  publishedAt: 'publishedAt',
  version: 'version',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  slug: 'slug',
  description: 'description',
  sortOrder: 'sortOrder',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  slug: 'slug',
  createdAt: 'createdAt'
};

exports.Prisma.BannerScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  title: 'title',
  subtitle: 'subtitle',
  imageUrl: 'imageUrl',
  actionUrl: 'actionUrl',
  actionText: 'actionText',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MenuScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  location: 'location',
  isActive: 'isActive',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MenuItemScalarFieldEnum = {
  id: 'id',
  menuId: 'menuId',
  parentId: 'parentId',
  label: 'label',
  url: 'url',
  target: 'target',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompanyInfoScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  aboutContent: 'aboutContent',
  logo: 'logo',
  favicon: 'favicon',
  slogan: 'slogan',
  phone: 'phone',
  hotline: 'hotline',
  email: 'email',
  address: 'address',
  googleMapsEmbed: 'googleMapsEmbed',
  facebook: 'facebook',
  zalo: 'zalo',
  youtube: 'youtube',
  tiktok: 'tiktok',
  workingHours: 'workingHours',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SeoConfigScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  metaTitle: 'metaTitle',
  metaDescription: 'metaDescription',
  ogImage: 'ogImage',
  googleAnalyticsId: 'googleAnalyticsId',
  googleSearchConsole: 'googleSearchConsole',
  robotsTxt: 'robotsTxt',
  enableSitemap: 'enableSitemap',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MediaScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  filename: 'filename',
  url: 'url',
  publicId: 'publicId',
  mimeType: 'mimeType',
  fileSize: 'fileSize',
  width: 'width',
  height: 'height',
  alt: 'alt',
  folder: 'folder',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt'
};

exports.Prisma.ContactFormSubmissionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  fullName: 'fullName',
  email: 'email',
  phone: 'phone',
  message: 'message',
  source: 'source',
  isRead: 'isRead',
  readAt: 'readAt',
  createdAt: 'createdAt'
};

exports.Prisma.DemoSessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  templateId: 'templateId',
  customData: 'customData',
  saveCount: 'saveCount',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  expiresAt: 'expiresAt',
  userAgent: 'userAgent',
  ipAddress: 'ipAddress',
  revokedAt: 'revokedAt',
  replacedByToken: 'replacedByToken',
  createdAt: 'createdAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  tenantId: 'tenantId',
  action: 'action',
  entityType: 'entityType',
  entityId: 'entityId',
  oldValues: 'oldValues',
  newValues: 'newValues',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.CustomerProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  companyName: 'companyName',
  taxCode: 'taxCode',
  address: 'address',
  birthday: 'birthday',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WishlistScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  templateId: 'templateId',
  createdAt: 'createdAt'
};

exports.Prisma.CartScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CartItemScalarFieldEnum = {
  id: 'id',
  cartId: 'cartId',
  templateId: 'templateId',
  createdAt: 'createdAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  templateId: 'templateId',
  rating: 'rating',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.TemplateDraftScalarFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  themeConfig: 'themeConfig',
  layoutConfig: 'layoutConfig',
  featureFlags: 'featureFlags',
  components: 'components',
  lastSavedAt: 'lastSavedAt',
  savedBy: 'savedBy'
};

exports.Prisma.TemplateVersionScalarFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  version: 'version',
  themeConfig: 'themeConfig',
  layoutConfig: 'layoutConfig',
  featureFlags: 'featureFlags',
  components: 'components',
  status: 'status',
  updateNotes: 'updateNotes',
  publishedAt: 'publishedAt',
  publishedBy: 'publishedBy'
};

exports.Prisma.TenantThemeSettingsScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  primaryColor: 'primaryColor',
  secondaryColor: 'secondaryColor',
  accentColor: 'accentColor',
  backgroundColor: 'backgroundColor',
  surfaceColor: 'surfaceColor',
  textColor: 'textColor',
  textMutedColor: 'textMutedColor',
  borderColor: 'borderColor',
  fontHeading: 'fontHeading',
  fontBody: 'fontBody',
  fontSizeBase: 'fontSizeBase',
  lineHeight: 'lineHeight',
  containerWidth: 'containerWidth',
  borderRadius: 'borderRadius',
  shadowStyle: 'shadowStyle',
  darkMode: 'darkMode',
  customCss: 'customCss',
  buttonStyle: 'buttonStyle',
  animationsEnabled: 'animationsEnabled',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TenantPageScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  slug: 'slug',
  title: 'title',
  description: 'description',
  published: 'published',
  isSystem: 'isSystem',
  sortOrder: 'sortOrder',
  seoTitle: 'seoTitle',
  seoDesc: 'seoDesc',
  seoKeywords: 'seoKeywords',
  ogImage: 'ogImage',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TenantSectionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  pageId: 'pageId',
  sectionKey: 'sectionKey',
  label: 'label',
  isVisible: 'isVisible',
  sortOrder: 'sortOrder',
  content: 'content',
  settings: 'settings',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContentVersionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  entityType: 'entityType',
  entityId: 'entityId',
  snapshot: 'snapshot',
  description: 'description',
  isAutoSave: 'isAutoSave',
  createdAt: 'createdAt',
  createdBy: 'createdBy'
};

exports.Prisma.TenantDomainSettingsScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  subdomain: 'subdomain',
  platformDomain: 'platformDomain',
  customDomain: 'customDomain',
  sslStatus: 'sslStatus',
  dnsVerified: 'dnsVerified',
  dnsVerifiedAt: 'dnsVerifiedAt',
  sslIssuedAt: 'sslIssuedAt',
  sslExpiresAt: 'sslExpiresAt',
  plan: 'plan',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MediaFolderScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  parentId: 'parentId',
  name: 'name',
  slug: 'slug',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MediaAssetScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  folderId: 'folderId',
  url: 'url',
  thumbnailUrl: 'thumbnailUrl',
  mediumUrl: 'mediumUrl',
  largeUrl: 'largeUrl',
  type: 'type',
  size: 'size',
  format: 'format',
  width: 'width',
  height: 'height',
  name: 'name',
  alt: 'alt',
  caption: 'caption',
  tags: 'tags',
  focusPointX: 'focusPointX',
  focusPointY: 'focusPointY',
  provider: 'provider',
  providerMetadata: 'providerMetadata',
  processingStatus: 'processingStatus',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MediaUsageScalarFieldEnum = {
  id: 'id',
  mediaId: 'mediaId',
  entityType: 'entityType',
  entityId: 'entityId',
  fieldName: 'fieldName',
  createdAt: 'createdAt'
};

exports.Prisma.MediaRecycleBinScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  mediaId: 'mediaId',
  deletedAt: 'deletedAt',
  expiresAt: 'expiresAt',
  originalPath: 'originalPath'
};

exports.Prisma.LeadScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  fullName: 'fullName',
  email: 'email',
  phone: 'phone',
  source: 'source',
  status: 'status',
  assignedTo: 'assignedTo',
  projectId: 'projectId',
  projectTitle: 'projectTitle',
  budget: 'budget',
  note: 'note',
  tags: 'tags',
  lastActivityAt: 'lastActivityAt',
  wonAt: 'wonAt',
  lostAt: 'lostAt',
  lostReason: 'lostReason',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LeadNoteScalarFieldEnum = {
  id: 'id',
  leadId: 'leadId',
  tenantId: 'tenantId',
  content: 'content',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LeadActivityScalarFieldEnum = {
  id: 'id',
  leadId: 'leadId',
  tenantId: 'tenantId',
  type: 'type',
  description: 'description',
  metadata: 'metadata',
  createdBy: 'createdBy',
  scheduledAt: 'scheduledAt',
  completedAt: 'completedAt',
  createdAt: 'createdAt'
};

exports.Prisma.TenantApiKeyScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  keyPrefix: 'keyPrefix',
  keyHash: 'keyHash',
  scopes: 'scopes',
  lastUsedAt: 'lastUsedAt',
  lastUsedIp: 'lastUsedIp',
  expiresAt: 'expiresAt',
  isActive: 'isActive',
  createdBy: 'createdBy',
  revokedAt: 'revokedAt',
  revokedBy: 'revokedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TenantWebhookScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  url: 'url',
  secret: 'secret',
  events: 'events',
  isActive: 'isActive',
  lastTriggeredAt: 'lastTriggeredAt',
  failureCount: 'failureCount',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WebhookDeliveryScalarFieldEnum = {
  id: 'id',
  webhookId: 'webhookId',
  event: 'event',
  payload: 'payload',
  statusCode: 'statusCode',
  responseBody: 'responseBody',
  attemptCount: 'attemptCount',
  success: 'success',
  deliveredAt: 'deliveredAt',
  nextRetryAt: 'nextRetryAt',
  createdAt: 'createdAt'
};

exports.Prisma.TenantMembershipScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  tenantId: 'tenantId',
  role: 'role',
  status: 'status',
  invitedBy: 'invitedBy',
  inviteStatus: 'inviteStatus',
  inviteToken: 'inviteToken',
  inviteExpiresAt: 'inviteExpiresAt',
  invitedEmail: 'invitedEmail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PasswordResetTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  expiresAt: 'expiresAt',
  usedAt: 'usedAt',
  createdAt: 'createdAt'
};

exports.Prisma.EmailVerificationTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  expiresAt: 'expiresAt',
  usedAt: 'usedAt',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  TENANT_OWNER: 'TENANT_OWNER',
  EDITOR: 'EDITOR',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
  GUEST: 'GUEST'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  PENDING_SUBDOMAIN_CONFLICT: 'PENDING_SUBDOMAIN_CONFLICT',
  AWAITING_MANUAL_REVIEW: 'AWAITING_MANUAL_REVIEW',
  WAITING_CONFIRM: 'WAITING_CONFIRM',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

exports.ProjectType = exports.$Enums.ProjectType = {
  APARTMENT: 'APARTMENT',
  VILLA: 'VILLA',
  TOWNHOUSE: 'TOWNHOUSE',
  LAND: 'LAND',
  COMMERCIAL: 'COMMERCIAL',
  OFFICE: 'OFFICE'
};

exports.ProjectStatus = exports.$Enums.ProjectStatus = {
  COMING_SOON: 'COMING_SOON',
  SELLING: 'SELLING',
  SOLD_OUT: 'SOLD_OUT'
};

exports.LeadStatus = exports.$Enums.LeadStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUALIFIED: 'QUALIFIED',
  WON: 'WON',
  LOST: 'LOST',
  SPAM: 'SPAM'
};

exports.LeadActivityType = exports.$Enums.LeadActivityType = {
  NOTE: 'NOTE',
  CALL: 'CALL',
  EMAIL: 'EMAIL',
  MEETING: 'MEETING',
  TASK: 'TASK',
  STATUS_CHANGE: 'STATUS_CHANGE'
};

exports.Prisma.ModelName = {
  User: 'User',
  Tenant: 'Tenant',
  Template: 'Template',
  TemplateConfig: 'TemplateConfig',
  Order: 'Order',
  Subscription: 'Subscription',
  Project: 'Project',
  Post: 'Post',
  Category: 'Category',
  Tag: 'Tag',
  Banner: 'Banner',
  Menu: 'Menu',
  MenuItem: 'MenuItem',
  CompanyInfo: 'CompanyInfo',
  SeoConfig: 'SeoConfig',
  Media: 'Media',
  ContactFormSubmission: 'ContactFormSubmission',
  DemoSession: 'DemoSession',
  RefreshToken: 'RefreshToken',
  AuditLog: 'AuditLog',
  CustomerProfile: 'CustomerProfile',
  Wishlist: 'Wishlist',
  Cart: 'Cart',
  CartItem: 'CartItem',
  Review: 'Review',
  Notification: 'Notification',
  TemplateDraft: 'TemplateDraft',
  TemplateVersion: 'TemplateVersion',
  TenantThemeSettings: 'TenantThemeSettings',
  TenantPage: 'TenantPage',
  TenantSection: 'TenantSection',
  ContentVersion: 'ContentVersion',
  TenantDomainSettings: 'TenantDomainSettings',
  MediaFolder: 'MediaFolder',
  MediaAsset: 'MediaAsset',
  MediaUsage: 'MediaUsage',
  MediaRecycleBin: 'MediaRecycleBin',
  Lead: 'Lead',
  LeadNote: 'LeadNote',
  LeadActivity: 'LeadActivity',
  TenantApiKey: 'TenantApiKey',
  TenantWebhook: 'TenantWebhook',
  WebhookDelivery: 'WebhookDelivery',
  TenantMembership: 'TenantMembership',
  PasswordResetToken: 'PasswordResetToken',
  EmailVerificationToken: 'EmailVerificationToken'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
