-- posts
CREATE OR REPLACE FUNCTION public.log_deleted_post()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO deleted_posts(id, user_id, deleted_at)
  VALUES (OLD.id, OLD.user_id, EXTRACT(EPOCH FROM NOW()) * 1000);
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_deleted_posts
AFTER DELETE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.log_deleted_post();


-- comments
CREATE OR REPLACE FUNCTION public.log_deleted_comment()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO deleted_comments(id, user_id, deleted_at)
  VALUES (OLD.id, OLD.user_id, EXTRACT(EPOCH FROM NOW()) * 1000);
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_deleted_comments
AFTER DELETE ON public.comments
FOR EACH ROW EXECUTE FUNCTION public.log_deleted_comment();
