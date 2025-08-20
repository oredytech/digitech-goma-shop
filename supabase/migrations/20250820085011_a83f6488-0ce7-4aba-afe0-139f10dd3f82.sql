-- Create promotions table
CREATE TABLE public.promotions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed_amount')),
  value NUMERIC NOT NULL CHECK (value > 0),
  promo_code TEXT UNIQUE,
  minimum_amount NUMERIC DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  usage_limit INTEGER,
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Create policies for promotions
CREATE POLICY "Admins can manage promotions" 
ON public.promotions 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Promotions are viewable by everyone" 
ON public.promotions 
FOR SELECT 
USING (is_active = true AND start_date <= now() AND end_date >= now());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_promotions_updated_at
BEFORE UPDATE ON public.promotions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add validation trigger for date ranges
CREATE OR REPLACE FUNCTION validate_promotion_dates()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.end_date <= NEW.start_date THEN
    RAISE EXCEPTION 'End date must be after start date';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_promotion_dates_trigger
BEFORE INSERT OR UPDATE ON public.promotions
FOR EACH ROW
EXECUTE FUNCTION validate_promotion_dates();