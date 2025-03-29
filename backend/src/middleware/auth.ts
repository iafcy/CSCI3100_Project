import supabase from "../utils/supabase";

export const auth = async (req: any, res: any, next: any) => {
  try {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '');
    const refreshToken = req.header('RefreshToken');

    if (accessToken && refreshToken) {
      const { data: { user } } = await supabase.auth.getUser(accessToken);

      if (user && user.role) {
        req.user = user;

        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
  
        next();
      } else {
        res.status(401).json({ message: 'missing authentication token' });
      }
    } else {
      res.status(401).json({ message: 'missing authentication token' });
    }
  } catch (err) {
    return res.status(400).json({ message: 'missing authentication token' });
  }
};