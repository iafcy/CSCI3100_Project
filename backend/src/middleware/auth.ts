import supabase from "../utils/supabase";

const authenticateUser = async (req: any) => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '');
  const refreshToken = req.header('RefreshToken');

  if (accessToken && refreshToken) {
    const { data: { user } } = await supabase.auth.getUser(accessToken);

    if (user && user.role) {
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      return user;
    }
  }

  return null;
}

export const authRequired = async (req: any, res: any, next: any) => {
  try {
    const user = await authenticateUser(req);

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: 'missing authentication token' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'missing authentication token' });
  }
};

export const authOptional = async (req: any, res: any, next: any) => {
  try {
    const user = await authenticateUser(req);
    req.user = user;
  } catch (err) {
    req.user = null;
  }

  next();
};
