export function getUserFromReq(req) {
    // في التطوير، نفرض أن العميل يرسل في الهيدر role مباشرة (غير آمن لكن للتجربة فقط)
    const role = req.headers['x-user-role']
    const userId = req.headers['x-user-id'] || 1 // رقم ثابت كمثال
    if (!role) return null

    return { id: parseInt(userId), role }
}