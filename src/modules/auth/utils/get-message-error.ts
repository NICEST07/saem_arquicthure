import { getLang } from '@src/core/utils/get-lang'

interface TypeWithKey<T> { [key: string]: T }

export const getMessageError = async (errorCode: string) => {
  const lang = await getLang() ?? 'es'
  const codeMatcher: TypeWithKey<TypeWithKey<string>> = (await import(`@src/assets/languages/${lang}/errors.json`)).default

  return codeMatcher?.[errorCode] ?? codeMatcher.DEFAULT
}

export async function hasMessageError (message: string | unknown, responseCode: string | null) {
  const errorType = typeof message === 'string'
    ? message
    : await getMessageError(responseCode ?? '')

  return errorType
}
