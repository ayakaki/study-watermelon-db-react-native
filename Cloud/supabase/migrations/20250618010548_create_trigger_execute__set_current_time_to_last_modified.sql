CREATE TRIGGER trg_set_last_modified_on_posts
BEFORE INSERT OR UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.set_last_modified();

CREATE TRIGGER trg_set_last_modified_on_comments
BEFORE INSERT OR UPDATE ON public.comments
FOR EACH ROW EXECUTE FUNCTION public.set_last_modified();
