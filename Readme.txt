#subscriptionPlans
id
name
price
status ACTIVE/INACTIVE
type SITE/COMPANY

#subscriptionPlanProducts
id
subscriptionPlanId
productId
availableQuantity

#company
id
name

#companySubscriptionPlan
id
companyId
subscriptionPlanId
startDate
endDate
coupon

#companyEmployee
id
name
documentId
userId

#userProductAvailable
id
userId
productId
availableQuantity